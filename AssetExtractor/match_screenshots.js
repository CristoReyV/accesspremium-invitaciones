const fs = require('fs-extra');
const path = require('path');

const inspoDir = 'C:\\Users\\Cristo\\Documents\\SMART BRAIN\\WEB\\SmartStudio\\Inspo';
const replicasDir = 'C:\\Users\\Cristo\\Documents\\AssetExtractor\\replicas';

function getFilesRecursively(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getFilesRecursively(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    }
    return fileList;
}

function getDirectoriesRecursively(dir, dirList = []) {
    if (!fs.existsSync(dir)) return dirList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            // Si el directorio tiene un index.html, lo consideramos una hoja (réplica)
            if (fs.existsSync(path.join(filePath, 'index.html'))) {
                dirList.push(filePath);
            } else {
                getDirectoriesRecursively(filePath, dirList);
            }
        }
    }
    return dirList;
}

const screenshots = getFilesRecursively(inspoDir).filter(f => !f.endsWith('.md') && !f.endsWith('.txt'));
const replicaDirs = getDirectoriesRecursively(replicasDir);

const matches = [];
const unmatchedScreenshots = [];
const unmatchedReplicas = new Set(replicaDirs.map(d => path.basename(d)));

// Normalizar nombres para hacer la comparación más tolerante
const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

for (const screenshotPath of screenshots) {
    const ext = path.extname(screenshotPath);
    const baseName = path.basename(screenshotPath, ext);
    const normalizedBase = normalize(baseName);
    
    // Buscar la réplica que haga match (exacto o aproximado)
    let matchedReplica = null;
    let maxMatchScore = 0;
    
    for (const replica of replicaDirs) {
        const slug = path.basename(replica);
        const normalizedSlug = normalize(slug);
        
        // Exact match
        if (normalizedBase === normalizedSlug) {
            matchedReplica = replica;
            break;
        }
        
        // Partial match (si la captura incluye el slug o viceversa)
        if (normalizedBase.includes(normalizedSlug) || normalizedSlug.includes(normalizedBase)) {
            // Priorizamos la coincidencia más larga si hay varias (ej xv-1 vs xv-10)
            if (normalizedSlug.length > maxMatchScore) {
                matchedReplica = replica;
                maxMatchScore = normalizedSlug.length;
            }
        }
    }
    
    if (matchedReplica) {
        matches.push({ screenshot: screenshotPath, replica: matchedReplica, slug: path.basename(matchedReplica) });
        unmatchedReplicas.delete(path.basename(matchedReplica));
    } else {
        unmatchedScreenshots.push({ screenshot: screenshotPath, baseName });
    }
}

// Generar reporte
let report = '# Reporte de Coincidencias de Capturas\n\n';
report += `Se encontraron **${matches.length}** coincidencias entre las capturas de Inspo y las réplicas extraídas.\n`;
report += `Hay **${unmatchedScreenshots.length}** capturas sin coincidencia clara.\n`;
report += `Hay **${unmatchedReplicas.size}** réplicas sin captura detectada.\n\n`;

report += '## Coincidencias Listas para Mover\n';
matches.forEach(m => report += `- ✅ ${path.basename(m.screenshot)} -> ${m.slug}\n`);

report += '\n## Capturas Sin Coincidencia\n';
unmatchedScreenshots.forEach(m => report += `- ❌ ${m.baseName}\n`);

report += '\n## Réplicas Sin Captura (Sobran URLs o nombres diferentes)\n';
unmatchedReplicas.forEach(slug => report += `- ⚠️ ${slug}\n`);

fs.writeFileSync(path.join(__dirname, 'match_report.md'), report);
console.log('Reporte guardado en match_report.md');

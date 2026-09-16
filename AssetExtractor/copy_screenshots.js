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

const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

let copiedCount = 0;

for (const screenshotPath of screenshots) {
    const ext = path.extname(screenshotPath);
    const baseName = path.basename(screenshotPath, ext);
    const normalizedBase = normalize(baseName);
    
    let matchedReplica = null;
    let maxMatchScore = 0;
    
    for (const replica of replicaDirs) {
        const slug = path.basename(replica);
        const normalizedSlug = normalize(slug);
        
        if (normalizedBase === normalizedSlug) {
            matchedReplica = replica;
            break;
        }
        
        if (normalizedBase.includes(normalizedSlug) || normalizedSlug.includes(normalizedBase)) {
            if (normalizedSlug.length > maxMatchScore) {
                matchedReplica = replica;
                maxMatchScore = normalizedSlug.length;
            }
        }
    }
    
    if (matchedReplica) {
        const destPath = path.join(matchedReplica, path.basename(screenshotPath));
        try {
            // Copiar la imagen a la carpeta de réplica
            fs.copySync(screenshotPath, destPath);
            console.log(`Copiado: ${path.basename(screenshotPath)} -> ${path.basename(matchedReplica)}`);
            copiedCount++;
        } catch (err) {
            console.error(`Error copiando ${screenshotPath}:`, err.message);
        }
    }
}

console.log(`\n¡Proceso completado! Se han copiado ${copiedCount} capturas de pantalla exitosamente.`);

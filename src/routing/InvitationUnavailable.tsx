export default function InvitationUnavailable({ collision = false }: { collision?: boolean }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FCFAF5] px-6 text-center text-[#304B5A]">
      <div className="max-w-md border border-[#DAD6C9] p-10">
        <p className="mb-5 text-sm tracking-[0.3em]">404</p>
        <h1 className="mb-5 font-serif text-3xl">Invitación no disponible</h1>
        <p className="leading-relaxed">
          {collision
            ? "Este enlace tiene más de una invitación asociada. Solicita al organizador que revise la dirección."
            : "No encontramos una invitación en esta dirección. Revisa el enlace que te compartieron."}
        </p>
      </div>
    </main>
  );
}

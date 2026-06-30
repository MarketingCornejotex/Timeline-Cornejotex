export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      {/* Header público */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#429AB2] flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <div>
              <p className="font-bold text-[#323A45] text-sm leading-none">Cornejotex</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Nuestra Historia</p>
            </div>
          </div>
          <span className="text-xs text-gray-400 hidden sm:block">
            Más de 30 años de excelencia textil
          </span>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="py-8 text-center text-xs text-gray-400 border-t border-gray-100 bg-white mt-16">
        © {new Date().getFullYear()} Cornejotex · Ecuador · Todos los derechos reservados
      </footer>
    </div>
  )
}

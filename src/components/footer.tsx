export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 bg-[#030305] border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-[family-name:var(--font-heading)] text-white/40 font-semibold">
            Juldyz
          </span>
          <span className="w-px h-4 bg-white/10" />
          <span className="text-sm text-white/20">
            © {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/20">
          <a href="tel:+77474404076" className="hover:text-[#c9a96e] transition-colors">
            +7 747 440-40-76
          </a>
          <a
            href="https://2gis.kz/almaty/firm/70000001077386532"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#c9a96e] transition-colors"
          >
            2ГИС
          </a>
        </div>
      </div>
    </footer>
  );
}

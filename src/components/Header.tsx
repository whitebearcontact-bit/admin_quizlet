import { Bell, Menu, Search, HelpCircle } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
  onToggleSidebar: () => void;
}

export function Header({ title, subtitle, onToggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-5 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-base font-bold text-slate-900">{title}</h1>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Quick search..."
            className="w-48 rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 lg:w-64"
          />
        </div>
        <button className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700">
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute h-full w-full animate-pulse-ring rounded-full bg-rose-400" />
            <span className="relative h-2 w-2 rounded-full bg-rose-500" />
          </span>
        </button>
        <button className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700">
          <HelpCircle size={20} />
        </button>
        <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-bold text-white">
          AD
        </div>
      </div>
    </header>
  );
}

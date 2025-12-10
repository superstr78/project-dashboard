import { RefreshCw } from 'lucide-react';

interface HeaderProps {
  title: string;
  onRefresh?: () => void;
}

const Header = ({ title, onRefresh }: HeaderProps) => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-4 sm:px-6 py-4 flex items-center justify-between">
      <h2 className="text-xl sm:text-2xl font-semibold text-white">{title}</h2>
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw size={16} />
          <span className="hidden sm:inline">새로고침</span>
        </button>
      )}
    </header>
  );
};

export default Header;

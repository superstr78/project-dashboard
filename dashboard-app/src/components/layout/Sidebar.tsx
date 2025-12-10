import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  AlertCircle,
  Hammer,
  GitCommit,
  Ticket,
  Settings,
} from 'lucide-react';

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: '대시보드' },
  { path: '/packaging', icon: Package, label: '패키징 현황' },
  { path: '/issues', icon: AlertCircle, label: '이슈 현황' },
  { path: '/build', icon: Hammer, label: '빌드 상태' },
  { path: '/svn', icon: GitCommit, label: 'SVN 커밋' },
  { path: '/jira', icon: Ticket, label: 'Jira' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen flex flex-col">
      {/* 로고/타이틀 */}
      <div className="p-4 border-b border-slate-700">
        <h1 className="text-xl font-bold">GMDSOFT</h1>
        <p className="text-sm text-slate-400">프로젝트 대시보드</p>
      </div>

      {/* 메뉴 */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* 설정 (하단 분리) */}
        <div className="mt-8 pt-4 border-t border-slate-700">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700'
              }`
            }
          >
            <Settings size={20} />
            <span>설정</span>
          </NavLink>
        </div>
      </nav>

      {/* 푸터 */}
      <div className="p-4 border-t border-slate-700 text-xs text-slate-500">
        <p>© 2025 GMDSOFT</p>
      </div>
    </aside>
  );
};

export default Sidebar;

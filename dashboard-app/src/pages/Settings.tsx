import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';

type TabType = 'teams' | 'jira' | 'confluence' | 'svn' | 'build';

const tabs: { id: TabType; label: string }[] = [
  { id: 'teams', label: 'Teams' },
  { id: 'jira', label: 'Jira' },
  { id: 'confluence', label: 'Confluence' },
  { id: 'svn', label: 'SVN' },
  { id: 'build', label: '빌드서버' },
];

const inputClass = "w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-500";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<TabType>('teams');
  const [connected, setConnected] = useState({
    teams: false,
    jira: false,
    confluence: false,
    svn: false,
    build: false,
  });

  const handleTestConnection = (service: TabType) => {
    alert(`${service} 연결 테스트 중...`);
    setConnected((prev) => ({ ...prev, [service]: true }));
  };

  const handleSave = () => {
    alert('설정이 저장되었습니다.');
  };

  return (
    <div>
      <Header title="설정" />

      <div className="p-4 sm:p-6">
        {/* 탭 */}
        <div className="flex gap-1 sm:gap-2 mb-6 border-b border-slate-700 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Card>
          {/* Teams 설정 */}
          {activeTab === 'teams' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-white mb-4">Microsoft Teams 연동 설정</h3>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">테넌트 ID</label>
                <input type="text" className={inputClass} placeholder="테넌트 ID 입력" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">클라이언트 ID</label>
                <input type="text" className={inputClass} placeholder="클라이언트 ID 입력" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">클라이언트 시크릿</label>
                <input type="password" className={inputClass} placeholder="클라이언트 시크릿 입력" />
              </div>
            </div>
          )}

          {/* Jira 설정 */}
          {activeTab === 'jira' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-white mb-4">Jira 연동 설정</h3>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Jira 도메인</label>
                <input type="text" className={inputClass} placeholder="예: company.atlassian.net" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">이메일</label>
                <input type="email" className={inputClass} placeholder="Jira 계정 이메일" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">API 토큰</label>
                <input type="password" className={inputClass} placeholder="API 토큰 입력" />
              </div>
            </div>
          )}

          {/* Confluence 설정 */}
          {activeTab === 'confluence' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-white mb-4">Confluence 연동 설정</h3>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Confluence 도메인</label>
                <input type="text" className={inputClass} placeholder="예: company.atlassian.net/wiki" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">이메일</label>
                <input type="email" className={inputClass} placeholder="Confluence 계정 이메일" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">API 토큰</label>
                <input type="password" className={inputClass} placeholder="API 토큰 입력" />
              </div>
            </div>
          )}

          {/* SVN 설정 */}
          {activeTab === 'svn' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-white mb-4">SVN 연동 설정</h3>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">저장소 URL</label>
                <input type="text" className={inputClass} placeholder="예: svn://server/repo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">사용자명</label>
                <input type="text" className={inputClass} placeholder="SVN 사용자명" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">비밀번호</label>
                <input type="password" className={inputClass} placeholder="SVN 비밀번호" />
              </div>
            </div>
          )}

          {/* 빌드서버 설정 */}
          {activeTab === 'build' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-white mb-4">빌드 서버 연동 설정</h3>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">빌드 서버 URL</label>
                <input type="text" className={inputClass} placeholder="예: http://jenkins.company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">사용자명</label>
                <input type="text" className={inputClass} placeholder="빌드 서버 사용자명" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">API 토큰</label>
                <input type="password" className={inputClass} placeholder="API 토큰 입력" />
              </div>
            </div>
          )}

          {/* 연결 상태 및 버튼 */}
          <div className="mt-6 pt-4 border-t border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">연결 상태:</span>
              {connected[activeTab] ? (
                <span className="flex items-center gap-1 text-green-400">
                  <CheckCircle size={16} /> 연결됨
                </span>
              ) : (
                <span className="flex items-center gap-1 text-slate-500">
                  <XCircle size={16} /> 연결 안됨
                </span>
              )}
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleTestConnection(activeTab)}
                className="flex-1 sm:flex-none px-4 py-2 text-sm border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700"
              >
                연결 테스트
              </button>
              <button
                onClick={handleSave}
                className="flex-1 sm:flex-none px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                저장
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;

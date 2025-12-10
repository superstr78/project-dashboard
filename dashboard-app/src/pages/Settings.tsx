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
    // 연결 테스트 시뮬레이션
    alert(`${service} 연결 테스트 중...`);
    setConnected((prev) => ({ ...prev, [service]: true }));
  };

  const handleSave = () => {
    alert('설정이 저장되었습니다.');
  };

  return (
    <div>
      <Header title="설정" />

      <div className="p-6">
        {/* 탭 */}
        <div className="flex gap-2 mb-6 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
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
              <h3 className="font-semibold text-lg mb-4">Microsoft Teams 연동 설정</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">테넌트 ID</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="테넌트 ID 입력" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">클라이언트 ID</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="클라이언트 ID 입력" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">클라이언트 시크릿</label>
                <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="클라이언트 시크릿 입력" />
              </div>
            </div>
          )}

          {/* Jira 설정 */}
          {activeTab === 'jira' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Jira 연동 설정</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jira 도메인</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="예: company.atlassian.net" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Jira 계정 이메일" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API 토큰</label>
                <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="API 토큰 입력" />
              </div>
            </div>
          )}

          {/* Confluence 설정 */}
          {activeTab === 'confluence' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Confluence 연동 설정</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confluence 도메인</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="예: company.atlassian.net/wiki" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Confluence 계정 이메일" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API 토큰</label>
                <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="API 토큰 입력" />
              </div>
            </div>
          )}

          {/* SVN 설정 */}
          {activeTab === 'svn' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">SVN 연동 설정</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">저장소 URL</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="예: svn://server/repo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">사용자명</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="SVN 사용자명" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="SVN 비밀번호" />
              </div>
            </div>
          )}

          {/* 빌드서버 설정 */}
          {activeTab === 'build' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">빌드 서버 연동 설정</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">빌드 서버 URL</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="예: http://jenkins.company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">사용자명</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="빌드 서버 사용자명" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API 토큰</label>
                <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="API 토큰 입력" />
              </div>
            </div>
          )}

          {/* 연결 상태 및 버튼 */}
          <div className="mt-6 pt-4 border-t flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">연결 상태:</span>
              {connected[activeTab] ? (
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle size={16} /> 연결됨
                </span>
              ) : (
                <span className="flex items-center gap-1 text-gray-400">
                  <XCircle size={16} /> 연결 안됨
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleTestConnection(activeTab)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                연결 테스트
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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

import { useState } from 'react';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import StatusBadge from '../components/common/StatusBadge';

// 임시 데이터
const jiraIssues = [
  { key: 'MD-123', summary: '로그인 기능 개선', status: '진행 중', assignee: '홍길동', created: '2025-12-10', priority: 'High' },
  { key: 'MD-122', summary: '대시보드 UI 수정', status: '완료', assignee: '김개발', created: '2025-12-09', priority: 'Medium' },
  { key: 'MR-456', summary: 'API 응답 속도 개선', status: '진행 중', assignee: '이성능', created: '2025-12-09', priority: 'High' },
  { key: 'FS-789', summary: '얼굴 인식 정확도 향상', status: '대기', assignee: '박개발', created: '2025-12-08', priority: 'Critical' },
  { key: 'MD-121', summary: '버그: 데이터 누락', status: '완료', assignee: '최테스트', created: '2025-12-07', priority: 'High' },
];

const projects = [
  { value: 'all', label: '전체' },
  { value: 'MD', label: 'MD Series' },
  { value: 'MR', label: 'MDRED' },
  { value: 'FS', label: 'Face Search' },
];

const statuses = [
  { value: 'all', label: '전체' },
  { value: '대기', label: '대기' },
  { value: '진행 중', label: '진행 중' },
  { value: '완료', label: '완료' },
];

const getStatusType = (status: string) => {
  if (status === '완료') return 'success';
  if (status === '진행 중') return 'warning';
  if (status === '대기') return 'info';
  return 'default';
};

const getPriorityColor = (priority: string) => {
  if (priority === 'Critical') return 'text-red-600';
  if (priority === 'High') return 'text-orange-500';
  if (priority === 'Medium') return 'text-yellow-600';
  return 'text-gray-500';
};

const Jira = () => {
  const [projectFilter, setProjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tab, setTab] = useState<'recent' | 'completed'>('recent');

  const handleRefresh = () => {
    console.log('Refreshing Jira data...');
  };

  const filteredIssues = jiraIssues.filter((issue) => {
    const matchProject = projectFilter === 'all' || issue.key.startsWith(projectFilter);
    const matchStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchTab = tab === 'recent' || (tab === 'completed' && issue.status === '완료');
    return matchProject && matchStatus && matchTab;
  });

  return (
    <div>
      <Header title="Jira 이슈 현황" onRefresh={handleRefresh} />

      <div className="p-6">
        {/* 필터 */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">프로젝트</label>
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {projects.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setTab('recent')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              tab === 'recent' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            최근 생성
          </button>
          <button
            onClick={() => setTab('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              tab === 'completed' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            최근 완료
          </button>
        </div>

        {/* 테이블 */}
        <Card>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-500">이슈 키</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">제목</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">상태</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">담당자</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">우선순위</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">생성일</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.map((issue) => (
                <tr key={issue.key} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-mono text-blue-600">{issue.key}</span>
                  </td>
                  <td className="py-3 px-4 font-medium">{issue.summary}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={getStatusType(issue.status)} label={issue.status} />
                  </td>
                  <td className="py-3 px-4 text-gray-600">{issue.assignee}</td>
                  <td className={`py-3 px-4 font-medium ${getPriorityColor(issue.priority)}`}>
                    {issue.priority}
                  </td>
                  <td className="py-3 px-4 text-gray-500">{issue.created}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredIssues.length === 0 && (
            <div className="text-center py-8 text-gray-500">이슈가 없습니다</div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Jira;

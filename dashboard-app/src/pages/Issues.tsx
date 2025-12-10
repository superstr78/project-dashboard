import { useState } from 'react';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import StatusBadge from '../components/common/StatusBadge';

// 임시 데이터
const projects = [
  { id: 'all', name: '전체' },
  { id: 'md-series', name: 'MD Series' },
  { id: 'mdred', name: 'MDRED' },
  { id: 'face-search', name: 'Face Search' },
];

const issuesData = [
  {
    id: '1',
    title: '로그인 오류 발생',
    status: 'in_progress',
    assignee: '김개발',
    createdAt: '2025-12-09',
    projectId: 'md-series',
  },
  {
    id: '2',
    title: 'UI 깨짐 현상',
    status: 'resolved',
    assignee: '이디자인',
    createdAt: '2025-12-08',
    projectId: 'md-series',
  },
  {
    id: '3',
    title: '성능 저하 이슈',
    status: 'in_progress',
    assignee: '박성능',
    createdAt: '2025-12-07',
    projectId: 'mdred',
  },
  {
    id: '4',
    title: '데이터 동기화 문제',
    status: 'open',
    assignee: '최백엔드',
    createdAt: '2025-12-10',
    projectId: 'face-search',
  },
  {
    id: '5',
    title: '메모리 누수 발생',
    status: 'in_progress',
    assignee: '김개발',
    createdAt: '2025-12-09',
    projectId: 'face-search',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'open':
      return <StatusBadge status="info" label="열림" />;
    case 'in_progress':
      return <StatusBadge status="warning" label="진행중" />;
    case 'resolved':
      return <StatusBadge status="success" label="해결됨" />;
    case 'closed':
      return <StatusBadge status="default" label="닫힘" />;
    default:
      return <StatusBadge status="default" label={status} />;
  }
};

const Issues = () => {
  const [selectedProject, setSelectedProject] = useState('all');

  const handleRefresh = () => {
    console.log('Refreshing issues...');
  };

  const filteredIssues = issuesData.filter((issue) => {
    if (selectedProject === 'all') return true;
    return issue.projectId === selectedProject;
  });

  return (
    <div>
      <Header title="이슈 현황" onRefresh={handleRefresh} />

      <div className="p-6">
        {/* 프로젝트 선택 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            프로젝트 선택
          </label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* 이슈 테이블 */}
        <Card>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-500">제목</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">상태</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">담당자</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">등록일</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-800">{issue.title}</span>
                  </td>
                  <td className="py-3 px-4">{getStatusBadge(issue.status)}</td>
                  <td className="py-3 px-4 text-gray-600">{issue.assignee}</td>
                  <td className="py-3 px-4 text-gray-500">{issue.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredIssues.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              이슈가 없습니다
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Issues;

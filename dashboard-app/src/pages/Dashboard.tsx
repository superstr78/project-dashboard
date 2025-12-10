import { Package, Hammer, AlertCircle, GitCommit } from 'lucide-react';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';

// 임시 데이터
const projectSummary = [
  {
    id: '1',
    name: 'MD Series',
    packaging: { status: 'in_progress', phase: '2차' },
    build: 'success',
    issues: 3,
  },
  {
    id: '2',
    name: 'MDRED',
    packaging: { status: 'deployed', phase: null },
    build: 'success',
    issues: 1,
  },
  {
    id: '3',
    name: 'Face Search',
    packaging: { status: 'in_progress', phase: '1차' },
    build: 'failure',
    issues: 5,
  },
];

const recentActivities = [
  { id: 1, message: 'MD Series 2차 패키징 진행 중 - 특이사항 있음', time: '10분 전', type: 'warning' },
  { id: 2, message: 'Face Search 빌드 실패', time: '30분 전', type: 'error' },
  { id: 3, message: 'MDRED 배포 완료', time: '1시간 전', type: 'success' },
  { id: 4, message: 'MD-123 이슈 생성됨', time: '2시간 전', type: 'info' },
];

const Dashboard = () => {
  const handleRefresh = () => {
    console.log('Refreshing dashboard...');
  };

  return (
    <div>
      <Header title="대시보드" onRefresh={handleRefresh} />

      <div className="p-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="패키징 현황"
            value="2/3"
            icon={<Package size={24} />}
            color="blue"
          />
          <StatCard
            title="빌드 성공률"
            value="67%"
            icon={<Hammer size={24} />}
            color="green"
          />
          <StatCard
            title="진행 중 이슈"
            value="9"
            icon={<AlertCircle size={24} />}
            color="yellow"
          />
          <StatCard
            title="금주 커밋"
            value="47"
            icon={<GitCommit size={24} />}
            color="gray"
          />
        </div>

        {/* 프로젝트별 요약 */}
        <Card title="프로젝트별 현황" className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projectSummary.map((project) => (
              <div
                key={project.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-gray-800 mb-3">{project.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">패키징</span>
                    <StatusBadge
                      status={project.packaging.status === 'deployed' ? 'success' : 'warning'}
                      label={
                        project.packaging.status === 'deployed'
                          ? '배포완료'
                          : `진행중 (${project.packaging.phase})`
                      }
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">빌드</span>
                    <StatusBadge
                      status={project.build === 'success' ? 'success' : 'error'}
                      label={project.build === 'success' ? '성공' : '실패'}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">이슈</span>
                    <span className="font-medium">{project.issues}건</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 최근 활동 */}
        <Card title="최근 활동">
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === 'success'
                        ? 'bg-green-500'
                        : activity.type === 'error'
                        ? 'bg-red-500'
                        : activity.type === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                    }`}
                  />
                  <span className="text-gray-700">{activity.message}</span>
                </div>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

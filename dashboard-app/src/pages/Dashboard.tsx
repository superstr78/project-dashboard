import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import StatusBadge from '../components/common/StatusBadge';

// 목업 데이터
const projectSummary = [
  { id: '1', name: 'MD-RED', packaging: { status: 'deployed', phase: null }, build: 'success', issues: 2 },
  { id: '2', name: 'MD-NEXT', packaging: { status: 'in_progress', phase: '2차' }, build: 'success', issues: 4 },
  { id: '3', name: 'MD-LIVE', packaging: { status: 'in_progress', phase: '1차' }, build: 'failure', issues: 3 },
  { id: '4', name: 'MD-MEDIA', packaging: { status: 'deployed', phase: null }, build: 'success', issues: 1 },
  { id: '5', name: 'MD-DRONE', packaging: { status: 'in_progress', phase: '3차' }, build: 'success', issues: 5 },
  { id: '6', name: 'MD-PCM', packaging: { status: 'deployed', phase: null }, build: 'success', issues: 0 },
];

const recentActivities = [
  { id: 1, message: 'MD-NEXT 2차 패키징 진행 중 - QA 이슈 발견', time: '10분 전', type: 'warning' },
  { id: 2, message: 'MD-LIVE 빌드 실패', time: '30분 전', type: 'error' },
  { id: 3, message: 'MD-RED 배포 완료', time: '1시간 전', type: 'success' },
  { id: 4, message: 'MD-DRONE r1542 커밋', time: '2시간 전', type: 'info' },
  { id: 5, message: 'MD-PCM 배포 완료', time: '3시간 전', type: 'success' },
];

const Dashboard = () => {
  const handleRefresh = () => {
    console.log('Refreshing dashboard...');
  };

  // 패키징 진행 중 / 배포 완료 그룹 분리
  const inProgressProjects = projectSummary.filter(p => p.packaging.status === 'in_progress');
  const deployedProjects = projectSummary.filter(p => p.packaging.status === 'deployed');

  const ProjectCard = ({ project }: { project: typeof projectSummary[0] }) => (
    <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 hover:bg-slate-700 transition-colors">
      <h4 className="font-semibold text-white mb-3">{project.name}</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">패키징</span>
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
          <span className="text-slate-400">빌드</span>
          <StatusBadge
            status={project.build === 'success' ? 'success' : 'error'}
            label={project.build === 'success' ? '성공' : '실패'}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400">이슈</span>
          <span className="font-medium text-white">{project.issues}건</span>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Header title="대시보드" onRefresh={handleRefresh} />

      <div className="p-4 sm:p-6">
        {/* 프로젝트 현황 */}
        <Card title="프로젝트 현황" className="mb-6">
          {/* 패키징 진행 중 */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-yellow-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              패키징 진행 중 ({inProgressProjects.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* 구분선 */}
          <div className="border-t border-slate-700 my-6"></div>

          {/* 배포 완료 */}
          <div>
            <h4 className="text-sm font-medium text-green-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              배포 완료 ({deployedProjects.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {deployedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </Card>

        {/* 최근 활동 */}
        <Card title="최근 활동">
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      activity.type === 'success'
                        ? 'bg-green-500'
                        : activity.type === 'error'
                        ? 'bg-red-500'
                        : activity.type === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                    }`}
                  />
                  <span className="text-slate-300 text-sm sm:text-base">{activity.message}</span>
                </div>
                <span className="text-xs sm:text-sm text-slate-500 whitespace-nowrap ml-2">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

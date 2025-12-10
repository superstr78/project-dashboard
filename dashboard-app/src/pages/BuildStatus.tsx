import { useState } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';

// 목업 데이터
const buildData = [
  { id: '1', projectName: 'MD Series', status: 'success' as const, buildNumber: '#142', startedAt: '2025-12-10 14:00', duration: '15분', errorLog: null },
  { id: '2', projectName: 'MDRED', status: 'success' as const, buildNumber: '#98', startedAt: '2025-12-10 13:30', duration: '12분', errorLog: null },
  { id: '3', projectName: 'Face Search', status: 'failure' as const, buildNumber: '#67', startedAt: '2025-12-10 14:20', duration: '8분', errorLog: `Error: Module not found 'xyz'\nat line 142, file: src/main.cpp\nBuild failed with exit code 1` },
];

const StatusIcon = ({ status }: { status: 'success' | 'failure' | 'running' }) => {
  if (status === 'success') return <CheckCircle className="text-green-400" size={24} />;
  if (status === 'failure') return <XCircle className="text-red-400" size={24} />;
  return <Clock className="text-yellow-400" size={24} />;
};

const BuildStatus = () => {
  const [selectedBuild, setSelectedBuild] = useState<string | null>(null);

  const handleRefresh = () => {
    console.log('Refreshing build status...');
  };

  const selectedData = buildData.find((item) => item.id === selectedBuild);

  return (
    <div>
      <Header title="빌드 상태" onRefresh={handleRefresh} />

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 빌드 목록 */}
          <Card className="lg:col-span-2 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px]">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 font-medium text-slate-400">프로젝트</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-400">상태</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-400 hidden sm:table-cell">빌드 번호</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-400 hidden md:table-cell">시작 시간</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-400 hidden sm:table-cell">소요 시간</th>
                  </tr>
                </thead>
                <tbody>
                  {buildData.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedBuild(item.id)}
                      className={`border-b border-slate-700 cursor-pointer hover:bg-slate-700/50 ${
                        selectedBuild === item.id ? 'bg-slate-700' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-medium text-white">{item.projectName}</td>
                      <td className="py-3 px-4">
                        <StatusIcon status={item.status} />
                      </td>
                      <td className="py-3 px-4 text-slate-400 hidden sm:table-cell">{item.buildNumber}</td>
                      <td className="py-3 px-4 text-slate-500 hidden md:table-cell">{item.startedAt}</td>
                      <td className="py-3 px-4 text-slate-500 hidden sm:table-cell">{item.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* 오류 로그 */}
          <Card title="빌드 상세">
            {selectedData ? (
              <div>
                <h4 className="font-semibold text-white mb-4">{selectedData.projectName}</h4>
                <div className="space-y-2 mb-4">
                  <p className="text-sm">
                    <span className="text-slate-400">빌드 번호:</span>{' '}
                    <span className="text-white">{selectedData.buildNumber}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-slate-400">상태:</span>{' '}
                    <span className={selectedData.status === 'success' ? 'text-green-400' : 'text-red-400'}>
                      {selectedData.status === 'success' ? '성공' : '실패'}
                    </span>
                  </p>
                </div>

                {selectedData.errorLog && (
                  <div>
                    <h5 className="font-medium text-red-400 mb-2">오류 로그</h5>
                    <pre className="bg-slate-900 text-slate-300 p-4 rounded-lg text-sm overflow-x-auto border border-slate-700">
                      {selectedData.errorLog}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">
                빌드를 선택하세요
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BuildStatus;

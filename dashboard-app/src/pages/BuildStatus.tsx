import { useState } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';

// 임시 데이터
const buildData = [
  {
    id: '1',
    projectName: 'MD Series',
    status: 'success' as const,
    buildNumber: '#142',
    startedAt: '2025-12-10 14:00',
    duration: '15분',
    errorLog: null,
  },
  {
    id: '2',
    projectName: 'MDRED',
    status: 'success' as const,
    buildNumber: '#98',
    startedAt: '2025-12-10 13:30',
    duration: '12분',
    errorLog: null,
  },
  {
    id: '3',
    projectName: 'Face Search',
    status: 'failure' as const,
    buildNumber: '#67',
    startedAt: '2025-12-10 14:20',
    duration: '8분',
    errorLog: `Error: Module not found 'xyz'
at line 142, file: src/main.cpp
Build failed with exit code 1`,
  },
];

const StatusIcon = ({ status }: { status: 'success' | 'failure' | 'running' }) => {
  if (status === 'success') return <CheckCircle className="text-green-500" size={24} />;
  if (status === 'failure') return <XCircle className="text-red-500" size={24} />;
  return <Clock className="text-yellow-500" size={24} />;
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

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 빌드 목록 */}
          <Card className="lg:col-span-2">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">프로젝트</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">상태</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">빌드 번호</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">시작 시간</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">소요 시간</th>
                </tr>
              </thead>
              <tbody>
                {buildData.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedBuild(item.id)}
                    className={`border-b cursor-pointer hover:bg-gray-50 ${
                      selectedBuild === item.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-medium">{item.projectName}</td>
                    <td className="py-3 px-4">
                      <StatusIcon status={item.status} />
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.buildNumber}</td>
                    <td className="py-3 px-4 text-gray-500">{item.startedAt}</td>
                    <td className="py-3 px-4 text-gray-500">{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* 오류 로그 */}
          <Card title="빌드 상세">
            {selectedData ? (
              <div>
                <h4 className="font-semibold mb-4">{selectedData.projectName}</h4>
                <div className="space-y-2 mb-4">
                  <p className="text-sm">
                    <span className="text-gray-500">빌드 번호:</span> {selectedData.buildNumber}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">상태:</span>{' '}
                    {selectedData.status === 'success' ? '성공' : '실패'}
                  </p>
                </div>

                {selectedData.errorLog && (
                  <div>
                    <h5 className="font-medium text-red-600 mb-2">오류 로그</h5>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                      {selectedData.errorLog}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
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

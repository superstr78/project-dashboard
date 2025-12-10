import { useState } from 'react';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import StatusBadge from '../components/common/StatusBadge';

// 임시 데이터
const packagingData = [
  {
    id: '1',
    projectName: 'MD Series',
    status: 'in_progress' as const,
    phase: '2차',
    note: 'QA 이슈 3건 발견, 수정 중',
    updatedAt: '2025-12-10 14:30',
    comments: [
      { author: '홍길동', content: 'QA에서 이슈 3건 발견, 수정 중', time: '14:30' },
      { author: '김개발', content: '1건 수정 완료', time: '15:00' },
    ],
  },
  {
    id: '2',
    projectName: 'MDRED',
    status: 'deployed' as const,
    phase: null,
    note: null,
    updatedAt: '2025-12-10 10:00',
    comments: [],
  },
  {
    id: '3',
    projectName: 'Face Search',
    status: 'in_progress' as const,
    phase: '1차',
    note: null,
    updatedAt: '2025-12-10 09:00',
    comments: [],
  },
];

type FilterType = 'all' | 'deployed' | 'in_progress';

const Packaging = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleRefresh = () => {
    console.log('Refreshing packaging data...');
  };

  const filteredData = packagingData.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const selectedData = packagingData.find((item) => item.id === selectedProject);

  return (
    <div>
      <Header title="패키징 현황" onRefresh={handleRefresh} />

      <div className="p-6">
        {/* 필터 */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setFilter('deployed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'deployed'
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            배포완료
          </button>
          <button
            onClick={() => setFilter('in_progress')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'in_progress'
                ? 'bg-yellow-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            진행중
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 테이블 */}
          <Card className="lg:col-span-2">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">프로젝트</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">상태</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">단계</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">특이사항</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">업데이트</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedProject(item.id)}
                    className={`border-b cursor-pointer hover:bg-gray-50 ${
                      selectedProject === item.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-medium">{item.projectName}</td>
                    <td className="py-3 px-4">
                      <StatusBadge
                        status={item.status === 'deployed' ? 'success' : 'warning'}
                        label={item.status === 'deployed' ? '배포완료' : '진행중'}
                      />
                    </td>
                    <td className="py-3 px-4">{item.phase || '-'}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {item.note || '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{item.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* 상세 정보 */}
          <Card title="상세 정보">
            {selectedData ? (
              <div>
                <h4 className="font-semibold text-lg mb-4">{selectedData.projectName}</h4>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-500">현재 단계</span>
                    <span className="font-medium">
                      {selectedData.phase ? `${selectedData.phase} 패키징` : '배포 완료'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">최근 업데이트</span>
                    <span>{selectedData.updatedAt}</span>
                  </div>
                </div>

                {selectedData.comments.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-700 mb-3">최근 댓글</h5>
                    <div className="space-y-3">
                      {selectedData.comments.map((comment, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{comment.author}</span>
                            <span className="text-gray-400">{comment.time}</span>
                          </div>
                          <p className="text-sm text-gray-600">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                프로젝트를 선택하세요
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Packaging;

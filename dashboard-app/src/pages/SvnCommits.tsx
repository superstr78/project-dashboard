import { useState } from 'react';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';

// 목업 데이터
const svnStats = [
  { projectName: 'MD-RED', commitCount: 32, percentage: 25 },
  { projectName: 'MD-NEXT', commitCount: 28, percentage: 22 },
  { projectName: 'MD-LIVE', commitCount: 18, percentage: 14 },
  { projectName: 'MD-MEDIA', commitCount: 22, percentage: 17 },
  { projectName: 'MD-DRONE', commitCount: 15, percentage: 12 },
  { projectName: 'MD-PCM', commitCount: 12, percentage: 10 },
];

const recentCommits = [
  { revision: 'r1542', project: 'MD-DRONE', message: '드론 연결 안정화', author: '한드론', time: '1시간 전' },
  { revision: 'r1541', project: 'MD-RED', message: '버그 수정', author: '홍길동', time: '2시간 전' },
  { revision: 'r1540', project: 'MD-NEXT', message: '기능 추가', author: '김개발', time: '3시간 전' },
  { revision: 'r1539', project: 'MD-MEDIA', message: '인코딩 최적화', author: '정미디어', time: '4시간 전' },
  { revision: 'r1538', project: 'MD-LIVE', message: '성능 개선', author: '이성능', time: '5시간 전' },
  { revision: 'r1537', project: 'MD-PCM', message: '테스트 추가', author: '최테스트', time: '6시간 전' },
];

const periods = [
  { value: '7', label: '최근 7일' },
  { value: '30', label: '최근 30일' },
  { value: '90', label: '최근 90일' },
];

const SvnCommits = () => {
  const [period, setPeriod] = useState('7');

  const handleRefresh = () => {
    console.log('Refreshing SVN data...');
  };

  return (
    <div>
      <Header title="SVN 커밋 현황" onRefresh={handleRefresh} />

      <div className="p-4 sm:p-6">
        {/* 기간 선택 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-400 mb-2">
            기간 선택
          </label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full sm:w-48 px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {periods.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 커밋 비율 차트 */}
          <Card title="프로젝트별 커밋 비율">
            <div className="space-y-4">
              {svnStats.map((stat) => (
                <div key={stat.projectName}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-white">{stat.projectName}</span>
                    <span className="text-slate-400">{stat.commitCount}건 ({stat.percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full transition-all"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700">
              <p className="text-sm text-slate-400">
                총 커밋: <span className="font-medium text-white">100건</span>
              </p>
            </div>
          </Card>

          {/* 최근 커밋 목록 */}
          <Card title="최근 커밋">
            <div className="space-y-3">
              {recentCommits.map((commit) => (
                <div
                  key={commit.revision}
                  className="flex items-start justify-between py-2 border-b border-slate-700 last:border-0"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-mono text-blue-400">{commit.revision}</span>
                      <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">{commit.project}</span>
                    </div>
                    <p className="text-sm text-slate-300 mt-1 truncate">{commit.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{commit.author}</p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap ml-2">{commit.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SvnCommits;

// 프로젝트 관련 타입
export interface Project {
  id: string;
  name: string;
  description?: string;
}

// 패키징 상태
export type PackagingStatus = 'deployed' | 'in_progress';

export interface PackagingInfo {
  projectId: string;
  projectName: string;
  status: PackagingStatus;
  phase?: string; // 1차, 2차 등
  note?: string;
  updatedAt: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

// 이슈 관련
export interface Issue {
  id: string;
  title: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignee?: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
}

// 빌드 상태
export type BuildResult = 'success' | 'failure' | 'running';

export interface BuildInfo {
  projectId: string;
  projectName: string;
  status: BuildResult;
  buildNumber: string;
  startedAt: string;
  finishedAt?: string;
  duration?: string;
  errorLog?: string;
}

// SVN 커밋
export interface SvnCommit {
  revision: string;
  author: string;
  message: string;
  date: string;
  projectId: string;
}

export interface SvnStats {
  projectId: string;
  projectName: string;
  commitCount: number;
  percentage: number;
}

// Jira 이슈
export interface JiraIssue {
  key: string;
  summary: string;
  status: string;
  assignee?: string;
  reporter: string;
  createdAt: string;
  updatedAt: string;
  priority: string;
  type: string;
  projectKey: string;
}

// 설정 관련
export interface TeamsConfig {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  connected: boolean;
}

export interface JiraConfig {
  domain: string;
  email: string;
  apiToken: string;
  connected: boolean;
}

export interface ConfluenceConfig {
  domain: string;
  email: string;
  apiToken: string;
  connected: boolean;
}

export interface SvnConfig {
  repositoryUrl: string;
  username: string;
  password: string;
  connected: boolean;
}

export interface AppSettings {
  teams: TeamsConfig;
  jira: JiraConfig;
  confluence: ConfluenceConfig;
  svn: SvnConfig;
}

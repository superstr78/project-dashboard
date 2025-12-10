import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Packaging from './pages/Packaging';
import Issues from './pages/Issues';
import BuildStatus from './pages/BuildStatus';
import SvnCommits from './pages/SvnCommits';
import Jira from './pages/Jira';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="packaging" element={<Packaging />} />
          <Route path="issues" element={<Issues />} />
          <Route path="build" element={<BuildStatus />} />
          <Route path="svn" element={<SvnCommits />} />
          <Route path="jira" element={<Jira />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

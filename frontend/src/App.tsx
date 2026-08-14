import { Navigate, Routes, Route } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import TripCasePage from './pages/TripCasePage';
import WorkspacePage from './pages/WorkspacePage';

const DRAWER_WIDTH = 220;

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <TopBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${DRAWER_WIDTH}px`, minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Toolbar sx={{ minHeight: '56px !important' }} />
        {children}
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout><WorkspacePage /></AppLayout>} />
      <Route path="/trip-case" element={<AppLayout><TripCasePage /></AppLayout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}


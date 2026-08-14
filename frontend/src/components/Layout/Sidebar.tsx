import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Chip,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LuggageIcon from '@mui/icons-material/Luggage';
import FlightIcon from '@mui/icons-material/Flight';
import MapIcon from '@mui/icons-material/Map';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 220;

const navItems = [
  { label: 'My Workspace', icon: <DashboardIcon fontSize="small" />, path: '/' },
  { label: 'Trip Case', icon: <LuggageIcon fontSize="small" />, path: '/trip-case' },
  { label: 'Rebooking', icon: <FlightIcon fontSize="small" />, path: '/rebooking', badge: 'New' },
  { label: 'Navigation Map', icon: <MapIcon fontSize="small" />, path: '/nav-map' },
  { label: 'Flight Connections', icon: <ConnectingAirportsIcon fontSize="small" />, path: '/connections' },
  { label: 'Passengers', icon: <PeopleIcon fontSize="small" />, path: '/passengers' },
  { label: 'Refund / EC261', icon: <ReceiptLongIcon fontSize="small" />, path: '/refund' },
  { label: 'Messages', icon: <ChatIcon fontSize="small" />, path: '/messages', count: 17 },
  { label: 'Locate PNR', icon: <SearchIcon fontSize="small" />, path: '/locate-pnr' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: '#002244',
          color: '#FFFFFF',
          borderRight: 'none',
        },
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 2.5, pb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <FlightIcon sx={{ color: '#F9B912', fontSize: 22 }} />
          <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#FFFFFF', fontSize: '1rem' }}>
            Lufthansa
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: '#8BA4BE', fontSize: '0.7rem' }}>
          Every journey matters
        </Typography>
      </Box>

      <Box sx={{ px: 2, pb: 1 }}>
        <Typography variant="caption" sx={{ color: '#8BA4BE', textTransform: 'uppercase', letterSpacing: 1 }}>
          IROPS Recovery Hub
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mx: 2, mb: 1 }} />

      <List dense sx={{ px: 1 }}>
        {navItems.map((item) => {
          const active = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
          return (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              selected={active}
              sx={{
                borderRadius: 1.5,
                mb: 0.25,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(249,185,18,0.15)',
                  '& .MuiListItemIcon-root': { color: '#F9B912' },
                  '& .MuiListItemText-primary': { color: '#F9B912', fontWeight: 700 },
                },
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
                '& .MuiListItemIcon-root': { color: 'rgba(255,255,255,0.6)', minWidth: 32 },
                '& .MuiListItemText-primary': { color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
              {item.badge && (
                <Chip label={item.badge} size="small" color="secondary" sx={{ height: 18, fontSize: '0.65rem' }} />
              )}
              {item.count && (
                <Chip label={item.count} size="small" sx={{ height: 18, fontSize: '0.65rem', bgcolor: '#D32F2F', color: '#fff' }} />
              )}
            </ListItemButton>
          );
        })}
      </List>

      {/* Airport weather widget */}
      <Box sx={{ mt: 'auto', p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon sx={{ color: '#8BA4BE', fontSize: 16 }} />
          <Box>
            <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.78rem' }}>
              Frankfurt (FRA)
            </Typography>
            <Typography variant="caption" sx={{ color: '#8BA4BE', fontSize: '0.7rem' }}>
              12°C · Cloudy · 14:34 CEST
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}

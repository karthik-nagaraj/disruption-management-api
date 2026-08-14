import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const DRAWER_WIDTH = 220;

export default function TopBar() {
  return (
    <MuiAppBar
      position="fixed"
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#FFFFFF',
        color: 'text.primary',
        borderBottom: '1px solid #E0E4E8',
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
      }}
    >
      <Toolbar sx={{ gap: 2, minHeight: '56px !important' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#F0F2F5',
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            flex: 1,
            maxWidth: 420,
          }}
        >
          <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 18 }} />
          <InputBase
            placeholder="Search PNR, flight, passenger..."
            inputProps={{ 'aria-label': 'search' }}
            sx={{ fontSize: '0.875rem', width: '100%' }}
          />
        </Box>

        <Box sx={{ flex: 1 }} />

        <Tooltip title="Alerts">
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Agent mode">
          <IconButton
            size="small"
            sx={{
              color: '#003A63',
              backgroundColor: '#E8EFF6',
              borderRadius: 2,
              px: 1.5,
              gap: 0.5,
              '&:hover': { backgroundColor: '#D0DCE8' },
            }}
          >
            <SupportAgentIcon fontSize="small" />
            <Typography variant="caption" fontWeight={600}>
              Agent
            </Typography>
          </IconButton>
        </Tooltip>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: '#003A63', fontSize: '0.8rem' }}>MH</Avatar>
          <Typography variant="body2" fontWeight={600} sx={{ color: 'text.primary' }}>
            Maria H.
          </Typography>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}


const DRAWER_WIDTH = 220;

export default function TopBar() {
  const username = useAuthStore((s) => s.username);

  return (
    <MuiAppBar
      position="fixed"
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#FFFFFF',
        color: 'text.primary',
        borderBottom: '1px solid #E0E4E8',
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
      }}
    >
      <Toolbar sx={{ gap: 2, minHeight: '56px !important' }}>
        {/* Search */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#F0F2F5',
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            flex: 1,
            maxWidth: 420,
          }}
        >
          <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 18 }} />
          <InputBase
            placeholder="Search PNR, flight, passenger..."
            inputProps={{ 'aria-label': 'search' }}
            sx={{ fontSize: '0.875rem', width: '100%' }}
          />
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Alerts */}
        <Tooltip title="Alerts">
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Agent toggle */}
        <Tooltip title="Agent mode">
          <IconButton
            size="small"
            sx={{
              color: '#003A63',
              backgroundColor: '#E8EFF6',
              borderRadius: 2,
              px: 1.5,
              gap: 0.5,
              '&:hover': { backgroundColor: '#D0DCE8' },
            }}
          >
            <SupportAgentIcon fontSize="small" />
            <Typography variant="caption" fontWeight={600}>
              Agent
            </Typography>
          </IconButton>
        </Tooltip>

        {/* User */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: '#003A63', fontSize: '0.8rem' }}>
            {username?.slice(0, 2).toUpperCase() ?? 'MH'}
          </Avatar>
          <Typography variant="body2" fontWeight={600} sx={{ color: 'text.primary' }}>
            {username ?? 'Maria H.'}
          </Typography>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}

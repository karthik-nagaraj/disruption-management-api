import { createTheme } from '@mui/material/styles';

export const lufthansaTheme = createTheme({
  palette: {
    primary: {
      main: '#003A63',
      light: '#1A5276',
      dark: '#002244',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F9B912',
      light: '#FBC839',
      dark: '#D4990F',
      contrastText: '#003A63',
    },
    background: {
      default: '#F0F2F5',
      paper: '#FFFFFF',
    },
    error: { main: '#D32F2F' },
    warning: { main: '#FF8C00' },
    success: { main: '#2E7D32' },
    text: {
      primary: '#1A1A2E',
      secondary: '#5A6A7A',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
    body2: { fontSize: '0.8rem' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
        containedPrimary: {
          backgroundColor: '#F9B912',
          color: '#003A63',
          '&:hover': { backgroundColor: '#D4990F' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, fontSize: '0.72rem' },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, minHeight: 48 },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: '#002244', color: '#FFFFFF' },
      },
    },
  },
});

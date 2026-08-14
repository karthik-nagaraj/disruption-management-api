import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import { login } from '../api/tripcase';
import { useAuthStore } from '../store/authStore';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(username, password);
      setAuth(data.token, data.username, data.role);
      navigate('/');
    } catch {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#002244',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={8}
        sx={{ width: 380, p: 4, borderRadius: 3 }}
        component="form"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: '#003A63',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 1.5,
            }}
          >
            <FlightIcon sx={{ color: '#F9B912', fontSize: 28 }} />
          </Box>
          <Typography variant="h6" fontWeight={700} color="primary">
            Lufthansa
          </Typography>
          <Typography variant="caption" color="text.secondary">
            IROPS Recovery Hub
          </Typography>
        </Box>

        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Sign in to continue
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
          autoComplete="username"
          sx={{ mb: 2 }}
          size="small"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          autoComplete="current-password"
          sx={{ mb: 3 }}
          size="small"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{ py: 1.25, backgroundColor: '#003A63', '&:hover': { backgroundColor: '#002244' }, color: '#FFFFFF' }}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
        </Button>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
          Authorized Lufthansa personnel only
        </Typography>
      </Paper>
    </Box>
  );
}

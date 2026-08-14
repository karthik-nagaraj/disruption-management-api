import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  CircularProgress,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FlightIcon from '@mui/icons-material/Flight';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { getTripCases } from '../api/tripcase';
import type { TripCase, DisruptionStatus } from '../types';
import { useNavigate } from 'react-router-dom';

const statusBg: Record<DisruptionStatus, string> = {
  DISRUPTED: '#FFEBEE',
  CANCELLED: '#FFEBEE',
  REBOOK_NEEDED: '#FFF3E0',
  ON_HOLD: '#E3F2FD',
  DELAYED: '#FFF3E0',
  CONFIRMED: '#E8F5E9',
  COMPLETED: '#E8F5E9',
  NORMAL: '#F5F5F5',
};

export default function WorkspacePage() {
  const [tripCases, setTripCases] = useState<TripCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getTripCases()
      .then(setTripCases)
      .finally(() => setLoading(false));
  }, []);

  const filtered = tripCases.filter(
    (tc) =>
      tc.pnr.toLowerCase().includes(search.toLowerCase()) ||
      tc.originAirport.includes(search.toUpperCase()) ||
      tc.destinationAirport.includes(search.toUpperCase())
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            My Workspace
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Active disruption cases requiring attention
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Chip
            icon={<WarningAmberIcon sx={{ fontSize: 16 }} />}
            label={`${tripCases.filter((t) => t.status === 'DISRUPTED' || t.status === 'CANCELLED').length} Active disruptions`}
            color="error"
            variant="outlined"
          />
        </Box>
      </Box>

      {/* Search */}
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by PNR or airport..."
        size="small"
        sx={{ mb: 3, width: 320 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filtered.length === 0 && (
            <Grid item xs={12}>
              <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                No trip cases found.
              </Typography>
            </Grid>
          )}
          {filtered.map((tc) => (
            <Grid item xs={12} sm={6} lg={4} key={tc.id}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  backgroundColor: statusBg[tc.status],
                  '&:hover': { boxShadow: 3 },
                  transition: 'box-shadow 0.2s',
                }}
                onClick={() => navigate(`/trip-case?pnr=${tc.pnr}`)}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {tc.pnr}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                      <FlightIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {tc.originAirport} → {tc.destinationAirport}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={tc.status.replace('_', ' ')}
                    size="small"
                    sx={{ fontWeight: 700, fontSize: '0.65rem' }}
                    color={tc.status === 'DISRUPTED' || tc.status === 'CANCELLED' ? 'error' : 'default'}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    {tc.passengerCount} passenger{tc.passengerCount !== 1 ? 's' : ''}
                  </Typography>
                  <Typography variant="caption" fontWeight={600} color="primary">
                    {tc.progressPercent}% resolved
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="text"
                  sx={{ mt: 1, p: 0, fontSize: '0.75rem' }}
                  onClick={(e) => { e.stopPropagation(); navigate(`/trip-case?pnr=${tc.pnr}`); }}
                >
                  View case →
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

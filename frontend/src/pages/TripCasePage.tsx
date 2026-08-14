import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  Typography,
  Chip,
  Grid,
  Paper,
  Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TripCaseHeader from '../components/TripCase/TripCaseHeader';
import RebookingOptions from '../components/Rebooking/RebookingOptions';
import { getTripCase, getRebookingOptions } from '../api/tripcase';
import type { TripCase, RebookingOption, DisruptionStatus } from '../types';
import dayjs from 'dayjs';

const DEFAULT_PNR = 'ABCD12';

const flightStatusColor: Record<DisruptionStatus, string> = {
  CANCELLED: '#D32F2F',
  REBOOK_NEEDED: '#FF8C00',
  ON_HOLD: '#1565C0',
  DISRUPTED: '#D32F2F',
  DELAYED: '#FF8C00',
  CONFIRMED: '#2E7D32',
  COMPLETED: '#2E7D32',
  NORMAL: '#2E7D32',
};

export default function TripCasePage() {
  const [params] = useSearchParams();
  const pnr = params.get('pnr') ?? DEFAULT_PNR;

  const [tripCase, setTripCase] = useState<TripCase | null>(null);
  const [rebookingOptions, setRebookingOptions] = useState<RebookingOption[]>([]);
  const [loadingCase, setLoadingCase] = useState(true);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [tab, setTab] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoadingCase(true);
    getTripCase(pnr)
      .then((tc) => {
        setTripCase(tc);
        setLoadingOptions(true);
        return getRebookingOptions(pnr);
      })
      .then(setRebookingOptions)
      .catch(() => setError('Failed to load trip case. Please try again.'))
      .finally(() => {
        setLoadingCase(false);
        setLoadingOptions(false);
      });
  }, [pnr]);

  const handleAcceptRebooking = (option: RebookingOption) => {
    alert(`Accepted: ${option.title} (${option.flightNumber})`);
  };

  if (loadingCase) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ m: 3 }}>{error}</Alert>;
  }

  if (!tripCase) return null;

  return (
    <Box>
      <TripCaseHeader tripCase={tripCase} />

      {/* Disruption alert banner */}
      {tripCase.disruptionReason && (
        <Alert severity="warning" sx={{ mt: 2, mb: 1 }}>
          Your flight from {tripCase.originAirport} to {tripCase.viaAirport ?? tripCase.destinationAirport} has been{' '}
          {tripCase.status === 'CANCELLED' ? 'cancelled' : 'disrupted'} due to {tripCase.disruptionReason.toLowerCase()}.
          We are monitoring your trip. We will work to rebook you automatically.
        </Alert>
      )}

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="✈ Rebooking" />
          <Tab label="Entitlements" />
          <Tab label="Track Bags" />
          <Tab label="Refund / EC261" />
        </Tabs>
      </Box>

      <Box sx={{ py: 3 }}>
        {tab === 0 && (
          <RebookingOptions options={rebookingOptions} loading={loadingOptions} onAccept={handleAcceptRebooking} />
        )}
        {tab === 1 && <EntitlementsTab />}
        {tab === 2 && <TrackBagsTab />}
        {tab === 3 && <RefundTab />}
      </Box>

      {/* Trip summary + Coverage + Help */}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              Trip summary
            </Typography>
            {tripCase.flights.map((f) => (
              <Box key={f.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 0.75 }}>
                <Typography variant="body2">
                  {f.originCode} → {f.destinationCode}
                </Typography>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    {dayjs(f.scheduledDeparture).format('HH:mm')}
                  </Typography>
                  <Chip
                    label={f.status.replace('_', ' ')}
                    size="small"
                    sx={{ height: 18, fontSize: '0.65rem', backgroundColor: flightStatusColor[f.status], color: '#fff' }}
                  />
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              You're covered
            </Typography>
            <Grid container spacing={1}>
              {[
                { icon: <CheckCircleIcon sx={{ color: '#2E7D32', fontSize: 18 }} />, text: 'Free rebooking', sub: 'No change fee' },
                { icon: <RestaurantIcon sx={{ color: '#2E7D32', fontSize: 18 }} />, text: 'Meal & refreshment', sub: 'If waiting 2h+' },
                { icon: <HotelIcon sx={{ color: '#2E7D32', fontSize: 18 }} />, text: 'Hotel stay', sub: 'If overnight' },
                { icon: <MonetizationOnIcon sx={{ color: '#2E7D32', fontSize: 18 }} />, text: 'Compensation', sub: 'If eligible (EC261)' },
              ].map(({ icon, text, sub }) => (
                <Grid item xs={6} key={text}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                    {icon}
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{text}</Typography>
                      <Typography variant="caption" color="text.secondary">{sub}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
            <SupportAgentIcon sx={{ color: '#003A63', fontSize: 40, mb: 1 }} />
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              Need help?
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
              We're here for you. Contact our IROPS team
            </Typography>
            <Button variant="contained" size="small" fullWidth>
              Contact agent
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

function EntitlementsTab() {
  return (
    <Alert severity="info">
      Entitlements are calculated based on your disruption type and will appear here once confirmed.
    </Alert>
  );
}

function TrackBagsTab() {
  return (
    <Alert severity="info">
      Baggage tracking information will be available here once your bags are checked in.
    </Alert>
  );
}

function RefundTab() {
  return (
    <Alert severity="info">
      EC261 refund eligibility will be assessed automatically. You will be notified within 24 hours.
    </Alert>
  );
}

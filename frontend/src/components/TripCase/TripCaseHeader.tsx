import { Box, Typography, Chip, LinearProgress, Tooltip } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PeopleIcon from '@mui/icons-material/People';
import type { TripCase, DisruptionStatus } from '../../types';

interface Props {
  tripCase: TripCase;
}

const statusConfig: Record<DisruptionStatus, { label: string; color: 'error' | 'warning' | 'success' | 'default' | 'info' }> = {
  DISRUPTED: { label: 'DISRUPTED', color: 'error' },
  CANCELLED: { label: 'CANCELLED', color: 'error' },
  REBOOK_NEEDED: { label: 'REBOOK NEEDED', color: 'warning' },
  ON_HOLD: { label: 'ON HOLD', color: 'warning' },
  DELAYED: { label: 'DELAYED', color: 'warning' },
  CONFIRMED: { label: 'CONFIRMED', color: 'success' },
  COMPLETED: { label: 'COMPLETED', color: 'success' },
  NORMAL: { label: 'NORMAL', color: 'default' },
};

export default function TripCaseHeader({ tripCase }: Props) {
  const status = statusConfig[tripCase.status] ?? { label: tripCase.status, color: 'default' };
  const primaryFlight = tripCase.flights[0];
  const route = tripCase.viaAirport
    ? `${tripCase.originAirport} → ${tripCase.viaAirport} → ${tripCase.destinationAirport}`
    : `${tripCase.originAirport} → ${tripCase.destinationAirport}`;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#003A63',
        color: '#FFFFFF',
        px: 3,
        py: 2,
        borderRadius: 2,
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      {/* Trip info */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: 'rgba(249,185,18,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <FlightTakeoffIcon sx={{ color: '#F9B912', fontSize: 20 }} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ color: '#FFFFFF', lineHeight: 1.2 }}>
            Trip Case • <strong>{tripCase.pnr}</strong>
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', mt: 0.25 }}>
            {primaryFlight?.flightNumber ?? '—'} &nbsp;{route}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
            {tripCase.disruptionReason && (
              <Chip
                label={tripCase.disruptionReason}
                size="small"
                sx={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', fontSize: '0.7rem' }}
              />
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PeopleIcon sx={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }} />
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)' }}>
                {tripCase.passengerCount} Passenger{tripCase.passengerCount !== 1 ? 's' : ''}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Progress + Status */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
        <Tooltip title={`Recovery progress: ${tripCase.progressPercent}%`}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ color: '#FFFFFF', fontWeight: 700, lineHeight: 1 }}>
              {tripCase.progressPercent}%
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              PROGRESS
            </Typography>
            <LinearProgress
              variant="determinate"
              value={tripCase.progressPercent}
              sx={{
                mt: 0.5,
                width: 80,
                height: 4,
                borderRadius: 2,
                backgroundColor: 'rgba(255,255,255,0.2)',
                '& .MuiLinearProgress-bar': { backgroundColor: '#F9B912' },
              }}
            />
          </Box>
        </Tooltip>

        <Chip
          label={status.label}
          color={status.color}
          sx={{
            fontWeight: 700,
            fontSize: '0.75rem',
            height: 32,
            px: 0.5,
            ...(status.color === 'error' && {
              backgroundColor: '#D32F2F',
              color: '#FFFFFF',
            }),
          }}
        />
      </Box>
    </Box>
  );
}

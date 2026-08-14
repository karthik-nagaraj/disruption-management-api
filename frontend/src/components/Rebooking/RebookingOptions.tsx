import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import type { RebookingOption } from '../../types';
import dayjs from 'dayjs';

interface Props {
  options: RebookingOption[];
  loading: boolean;
  onAccept: (option: RebookingOption) => void;
}

export default function RebookingOptions({ options, loading, onAccept }: Props) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (options.length === 0) {
    return <Alert severity="info">No rebooking options available at this time.</Alert>;
  }

  const recommended = options.filter((o) => o.aiRecommended);
  const others = options.filter((o) => !o.aiRecommended);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesomeIcon sx={{ color: '#F9B912', fontSize: 18 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            AI-powered recommendations for you
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Sort by: <strong>Recommended</strong>
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {[...recommended, ...others].map((option) => (
          <Grid item xs={12} sm={6} lg={3} key={option.id}>
            <RebookingCard option={option} onAccept={onAccept} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function RebookingCard({ option, onAccept }: { option: RebookingOption; onAccept: (o: RebookingOption) => void }) {
  const dep = dayjs(option.departureTime);
  const arr = dayjs(option.arrivalTime);

  const tagColor = option.tag === 'BEST_OPTION' ? '#1565C0' : option.tag === 'RECOMMENDED' ? '#2E7D32' : undefined;

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderColor: option.aiRecommended ? '#F9B912' : undefined,
        boxShadow: option.aiRecommended ? '0 0 0 2px rgba(249,185,18,0.3)' : undefined,
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: 3 },
      }}
    >
      {option.tag && (
        <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
          <Chip
            label={option.tag.replace('_', ' ')}
            size="small"
            sx={{ backgroundColor: tagColor, color: '#FFFFFF', fontWeight: 700, fontSize: '0.65rem', height: 20 }}
          />
        </Box>
      )}

      <CardContent sx={{ pt: option.tag ? 4.5 : 2, flex: 1 }}>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          {option.title}
        </Typography>

        {/* Route */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, my: 1 }}>
          <Typography variant="body2" fontWeight={700}>{option.originCode}</Typography>
          <FlightTakeoffIcon sx={{ fontSize: 14, color: 'text.secondary', mx: 0.5 }} />
          <Typography variant="body2" fontWeight={700}>{option.destinationCode}</Typography>
        </Box>

        {/* Times */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Typography variant="h6" fontWeight={700}>{dep.format('HH:mm')}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>→</Typography>
          <Typography variant="h6" fontWeight={700}>{arr.format('HH:mm')}</Typography>
        </Box>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {option.flightNumber} · {option.duration} · {option.directFlight ? 'Direct' : `via ${option.viaCode}`}
        </Typography>

        <Divider sx={{ my: 1.5 }} />

        {/* Cabin & price */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1.5 }}>
          <Chip label={option.cabinClass} size="small" variant="outlined" />
          <Chip
            label={option.priceDifference != null && option.priceDifference !== 0
              ? `+€${option.priceDifference.toLocaleString()}`
              : 'Free'}
            size="small"
            sx={{ backgroundColor: '#E8F5E9', color: '#2E7D32' }}
          />
          <Chip label={`${option.seatsAvailable} seats left`} size="small" sx={{ backgroundColor: '#FFF3E0', color: '#E65100' }} />
        </Box>

        {option.connectionQuality && (
          <Typography variant="caption" sx={{ color: '#2E7D32', display: 'block', mb: 1 }}>
            ✓ {option.connectionQuality}
          </Typography>
        )}
      </CardContent>

      <Box sx={{ px: 2, pb: 2 }}>
        {option.aiRecommended ? (
          <Button
            fullWidth
            variant="contained"
            size="small"
            onClick={() => onAccept(option)}
            sx={{ backgroundColor: '#F9B912', color: '#003A63', '&:hover': { backgroundColor: '#D4990F' } }}
          >
            Accept option
          </Button>
        ) : (
          <Button fullWidth variant="outlined" size="small" onClick={() => onAccept(option)}>
            View option
          </Button>
        )}
      </Box>
    </Card>
  );
}

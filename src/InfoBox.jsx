import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SunnyIcon from '@mui/icons-material/WbSunny';
import OpacityIcon from '@mui/icons-material/Opacity';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import Box from '@mui/material/Box';
import "./InfoBox.css";

export default function InfoBox({ info }) {
  const hot_url = "https://images.unsplash.com/photo-1730813803981-e62123681aec?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0";
  const cold_url = "https://images.unsplash.com/photo-1638023334855-e637422323d0?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0";
  const rain_url = "https://images.unsplash.com/photo-1599806112354-67f8b5425a06?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0";

  // Conditional image
  const image_url = info.humidity > 60 ? rain_url : info.temp > 25 ? hot_url : cold_url;

  const getWeatherIcon = () => {
    return info.humidity > 60 ? (
      <ThunderstormIcon sx={{ fontSize: '2rem', color: '#667eea' }} />
    ) : info.temp > 25 ? (
      <SunnyIcon sx={{ fontSize: '2rem', color: '#FFB81C' }} />
    ) : (
      <AcUnitIcon sx={{ fontSize: '2rem', color: '#4DD0E1' }} />
    );
  };

  return (
    <div className="InfoBox">
      <Card sx={{ maxWidth: 450 }}>
        <CardMedia
          sx={{ height: 200 }}
          image={image_url}
          title="weather image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {info.city}{" "}
            {getWeatherIcon()}
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '1.5rem',
            marginTop: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ThermostatIcon sx={{ color: '#667eea', fontSize: '1.5rem' }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#999', fontWeight: 600 }}>
                  Current
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
                  {info.temp.toFixed(1)}°C
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <OpacityIcon sx={{ color: '#4DD0E1', fontSize: '1.5rem' }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#999', fontWeight: 600 }}>
                  Humidity
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
                  {info.humidity}%
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ThermostatIcon sx={{ color: '#66BB6A', fontSize: '1.5rem' }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#999', fontWeight: 600 }}>
                  Min Temp
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
                  {info.tempMin.toFixed(1)}°C
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ThermostatIcon sx={{ color: '#EF5350', fontSize: '1.5rem' }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#999', fontWeight: 600 }}>
                  Max Temp
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
                  {info.tempMax.toFixed(1)}°C
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" component="div" sx={{ 
            backgroundColor: '#f5f7fa',
            padding: '1.2rem',
            borderRadius: '12px',
            marginTop: '1rem'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
              <SentimentSatisfiedIcon sx={{ color: '#764ba2' }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                Feels Like: <span style={{ color: '#667eea', fontSize: '1.1rem', fontWeight: 700 }}>{info.feelsLike.toFixed(1)}°C</span>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#555', fontStyle: 'italic', lineHeight: 1.6 }}>
              Current conditions: <span style={{ color: '#764ba2', fontWeight: 700, textTransform: 'capitalize' }}>{info.weather}</span>
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

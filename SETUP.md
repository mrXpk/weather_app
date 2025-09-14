# Weather App Setup Guide

## Getting Started

Your weather app is almost ready! You just need to get a free API key from OpenWeatherMap.

### Step 1: Get OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. After signing up, go to your API keys section
4. Copy your API key

### Step 2: Add Your API Key

1. Open `services/weatherService.ts`
2. Replace `'your_openweather_api_key_here'` with your actual API key
3. Save the file

### Step 3: Run Your App

```bash
npm start
```

Then press:
- `a` for Android
- `i` for iOS  
- `w` for web

## Features Included

✅ **Current Weather Display**
- Temperature, humidity, pressure, wind speed
- Weather conditions with descriptions
- Location-based weather

✅ **5-Day Forecast**
- Daily weather predictions
- High/low temperatures
- Weather conditions

✅ **Location Services**
- Auto-detect current location
- Location permissions handling

✅ **City Search**
- Search for cities worldwide
- Select different locations

✅ **Responsive Design**
- Works on Android, iOS, and web
- Beautiful, modern UI
- Pull-to-refresh functionality

✅ **Error Handling**
- Graceful error messages
- Retry functionality
- Loading states

## Troubleshooting

**Location not working?**
- Make sure location permissions are enabled
- Check that location services are turned on

**API errors?**
- Verify your API key is correct
- Check your internet connection
- Ensure you haven't exceeded API limits (2000 calls/day on free tier)

**App not starting?**
- Run `npm install` to ensure all dependencies are installed
- Clear cache with `npx expo start -c`

## Future Enhancements

You can extend this app by adding:
- Weather alerts and notifications
- Multiple city favorites
- Weather maps
- Hourly forecasts
- Weather widgets
- Dark mode toggle
- Unit preferences (°C/°F)

Enjoy your weather app! 🌤️
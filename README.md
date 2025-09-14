# 🌤️ Weather App

A beautiful, modern weather application built with React Native and Expo. Get real-time weather data, 5-day forecasts, and search for cities worldwide!

![Weather App](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-brightgreen)
![React Native](https://img.shields.io/badge/React%20Native-0.81.4-blue)
![Expo](https://img.shields.io/badge/Expo-~54.0.7-black)
![TypeScript](https://img.shields.io/badge/TypeScript-~5.9.2-blue)

## ✨ Features

- 🌡️ **Real-time Weather Data** - Current temperature, humidity, pressure, wind speed
- 📅 **5-Day Forecast** - Detailed weather predictions with daily highs and lows
- 📍 **Location Services** - Auto-detect your location or search any city
- 🔍 **City Search** - Find weather for cities worldwide
- 🔄 **Pull-to-Refresh** - Update weather data with a simple swipe
- 📱 **Cross-Platform** - Works on iOS, Android, and Web
- 🎨 **Modern UI** - Clean, intuitive design with weather icons
- ⚡ **Fast & Responsive** - Optimized performance with React Native

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Expo CLI
- OpenWeatherMap API key (free)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mrXpk/weather_app.git
   cd weather_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your API key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key

4. **Configure API key**
   - Open `services/weatherService.ts`
   - Replace `'your_openweather_api_key_here'` with your actual API key

5. **Start the app**
   ```bash
   npm start
   ```

6. **Run on your device**
   - **iOS**: Press `i` or scan QR code with Camera app
   - **Android**: Press `a` or scan QR code with Expo Go
   - **Web**: Press `w` or visit `http://localhost:8081`

## 📱 Screenshots

<!-- Add screenshots here -->
*Screenshots coming soon...*

## 🏗️ Project Structure

```
Weather/
├── app/                    # Main application screens
│   ├── _layout.tsx        # Root layout with providers
│   └── index.tsx          # Main weather screen
├── components/            # Reusable UI components
│   ├── CurrentWeather.tsx # Current weather display
│   ├── Forecast.tsx       # 5-day forecast component
│   ├── SearchBar.tsx      # City search functionality
│   └── LoadingAndError.tsx# Loading and error states
├── contexts/              # React Context providers
│   └── WeatherContext.tsx # Global weather state management
├── services/              # External service integrations
│   ├── weatherService.ts  # OpenWeatherMap API integration
│   └── locationService.ts # Location services
├── types/                 # TypeScript type definitions
│   └── weather.ts         # Weather data types
└── SETUP.md              # Detailed setup instructions
```

## 🛠️ Built With

- **[React Native](https://reactnative.dev/)** - Mobile app framework
- **[Expo](https://expo.dev/)** - Development platform
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Expo Router](https://docs.expo.dev/router/introduction/)** - File-based routing
- **[OpenWeatherMap API](https://openweathermap.org/api)** - Weather data
- **[Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)** - Location services
- **[Axios](https://axios-http.com/)** - HTTP client
- **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/)** - Local storage

## 🎨 Features in Detail

### Current Weather
- Real-time temperature and "feels like" temperature
- Weather conditions with descriptive icons
- Humidity, pressure, visibility, and wind data
- Location-based automatic updates

### 5-Day Forecast
- Daily high and low temperatures
- Weather conditions for each day
- Humidity and wind speed predictions
- Horizontal scrollable cards

### Search & Location
- Auto-detect user location with permission handling
- Search cities worldwide with autocomplete
- Fallback to default city if location unavailable
- Reverse geocoding for location names

### User Experience
- Pull-to-refresh functionality
- Loading states and error handling
- Responsive design for all screen sizes
- Cross-platform compatibility

## 🔧 Configuration

### Environment Setup

The app uses the following key dependencies:
- `expo-location` for GPS services
- `@react-native-async-storage/async-storage` for data persistence
- `axios` for API requests
- `react-native-svg` for custom icons

### API Configuration

Edit `services/weatherService.ts` to configure:
- API key
- Base URL
- Request parameters
- Error handling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [Expo Vector Icons](https://docs.expo.dev/guides/icons/)
- Built with [Expo](https://expo.dev/) development tools

## 📞 Support

If you have any questions or run into issues, please:
1. Check the [SETUP.md](SETUP.md) file for detailed setup instructions
2. Open an issue in this repository
3. Check the [Expo documentation](https://docs.expo.dev/)

---

⭐ **Star this repository if you found it helpful!** ⭐

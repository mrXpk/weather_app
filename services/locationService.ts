import * as Location from 'expo-location';
import { LocationData } from '../types/weather';

class LocationService {
  async requestLocationPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }

  async getCurrentLocation(): Promise<LocationData | null> {
    try {
      const hasPermission = await this.requestLocationPermission();
      
      if (!hasPermission) {
        throw new Error('Location permission not granted');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  }

  async reverseGeocode(latitude: number, longitude: number): Promise<{ city?: string; country?: string } | null> {
    try {
      const result = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (result.length > 0) {
        const location = result[0];
        return {
          city: location.city || location.district || undefined,
          country: location.country || undefined,
        };
      }

      return null;
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return null;
    }
  }

  async getLocationWithDetails(): Promise<LocationData | null> {
    try {
      const coords = await this.getCurrentLocation();
      
      if (!coords) {
        return null;
      }

      const details = await this.reverseGeocode(coords.latitude, coords.longitude);

      return {
        ...coords,
        city: details?.city,
        country: details?.country,
      };
    } catch (error) {
      console.error('Error getting location with details:', error);
      return null;
    }
  }
}

export const locationService = new LocationService();
export default LocationService;
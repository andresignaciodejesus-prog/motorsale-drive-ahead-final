import { useState, useEffect, useCallback } from 'react';
import { vehicleService, Vehicle, VehicleFilters, VehicleStats } from '@/services/vehicleService';

export interface UseVehiclesReturn {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  stats: VehicleStats;
  
  // CRUD operations
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt' | 'slug'>) => Promise<Vehicle>;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => Promise<Vehicle | null>;
  deleteVehicle: (id: string) => Promise<boolean>;
  getVehicleById: (id: string) => Vehicle | undefined;
  getVehicleBySlug: (slug: string) => Vehicle | undefined;
  
  // Search and filtering
  searchVehicles: (query: string, filters?: VehicleFilters) => Vehicle[];
  
  // Utility functions
  getBrands: () => string[];
  getModels: (brand?: string) => string[];
  getYears: () => number[];
  getLocations: () => string[];
  
  // Refresh data
  refresh: () => void;
}

export const useVehicles = (): UseVehiclesReturn => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<VehicleStats>({
    total: 0,
    available: 0,
    sold: 0,
    reserved: 0,
    maintenance: 0,
    averagePrice: 0,
    totalValue: 0,
    newVehicles: 0,
    usedVehicles: 0,
    featuredVehicles: 0,
  });

  const loadVehicles = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      
      const allVehicles = vehicleService.getAllVehicles();
      const vehicleStats = vehicleService.getStats();
      
      setVehicles(allVehicles);
      setStats(vehicleStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading vehicles');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  const addVehicle = useCallback(async (vehicleData: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): Promise<Vehicle> => {
    try {
      setError(null);
      const newVehicle = vehicleService.addVehicle(vehicleData);
      loadVehicles(); // Refresh data
      return newVehicle;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error adding vehicle';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [loadVehicles]);

  const updateVehicle = useCallback(async (id: string, updates: Partial<Vehicle>): Promise<Vehicle | null> => {
    try {
      setError(null);
      const updatedVehicle = vehicleService.updateVehicle(id, updates);
      if (updatedVehicle) {
        loadVehicles(); // Refresh data
      }
      return updatedVehicle;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating vehicle';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [loadVehicles]);

  const deleteVehicle = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      const success = vehicleService.deleteVehicle(id);
      if (success) {
        loadVehicles(); // Refresh data
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error deleting vehicle';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [loadVehicles]);

  const getVehicleById = useCallback((id: string): Vehicle | undefined => {
    return vehicleService.getVehicleById(id);
  }, []);

  const getVehicleBySlug = useCallback((slug: string): Vehicle | undefined => {
    return vehicleService.getVehicleBySlug(slug);
  }, []);

  const searchVehicles = useCallback((query: string, filters?: VehicleFilters): Vehicle[] => {
    return vehicleService.searchVehicles(query, filters);
  }, []);

  const getBrands = useCallback((): string[] => {
    return vehicleService.getBrands();
  }, []);

  const getModels = useCallback((brand?: string): string[] => {
    return vehicleService.getModels(brand);
  }, []);

  const getYears = useCallback((): number[] => {
    return vehicleService.getYears();
  }, []);

  const getLocations = useCallback((): string[] => {
    return vehicleService.getLocations();
  }, []);

  const refresh = useCallback(() => {
    loadVehicles();
  }, [loadVehicles]);

  return {
    vehicles,
    loading,
    error,
    stats,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    getVehicleById,
    getVehicleBySlug,
    searchVehicles,
    getBrands,
    getModels,
    getYears,
    getLocations,
    refresh,
  };
};

export default useVehicles;

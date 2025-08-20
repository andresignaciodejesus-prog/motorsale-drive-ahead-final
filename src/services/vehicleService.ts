export interface Vehicle {
  id: string;
  // Basic Info
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: 'Gasolina' | 'Diesel' | 'Híbrido' | 'Eléctrico';
  transmission: 'Manual' | 'Automática';
  bodyType: 'Sedán' | 'SUV' | 'Hatchback' | 'Pickup' | 'Convertible' | 'Coupé';
  
  // Status
  status: 'available' | 'sold' | 'reserved' | 'maintenance';
  isNew: boolean;
  isFeatured: boolean;
  
  // Location & Contact
  location: string;
  dealerName?: string;
  dealerPhone?: string;
  
  // Images
  images: string[];
  mainImage: string;
  
  // Detailed Info
  description: string;
  features: string[];
  condition: 'Excelente' | 'Muy Bueno' | 'Bueno' | 'Regular';
  
  // Technical Details
  engine: string;
  doors: number;
  seats: number;
  color: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  soldAt?: string;
  
  // SEO & Marketing
  slug: string;
  tags: string[];
  
  // Financial
  originalPrice?: number;
  discount?: number;
  financing?: {
    available: boolean;
    minDownPayment?: number;
    maxTerms?: number;
  };
}

export interface VehicleFilters {
  brand?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  mileageMax?: number;
  fuel?: string[];
  transmission?: string[];
  bodyType?: string[];
  status?: string[];
  location?: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface VehicleStats {
  total: number;
  available: number;
  sold: number;
  reserved: number;
  maintenance: number;
  averagePrice: number;
  totalValue: number;
  newVehicles: number;
  usedVehicles: number;
  featuredVehicles: number;
}

class VehicleService {
  private vehicles: Vehicle[] = [];
  private storageKey = 'motorsale_vehicles';

  constructor() {
    this.loadVehicles();
  }

  // Storage Management
  private loadVehicles(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.vehicles = JSON.parse(stored);
      } else {
        // Initialize with sample data if no stored data
        this.vehicles = this.getSampleVehicles();
        this.saveVehicles();
      }
    } catch (error) {
      console.error('Error loading vehicles:', error);
      this.vehicles = this.getSampleVehicles();
    }
  }

  private saveVehicles(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.vehicles));
    } catch (error) {
      console.error('Error saving vehicles:', error);
    }
  }

  // CRUD Operations
  getAllVehicles(): Vehicle[] {
    return [...this.vehicles];
  }

  getVehicleById(id: string): Vehicle | undefined {
    return this.vehicles.find(v => v.id === id);
  }

  getVehicleBySlug(slug: string): Vehicle | undefined {
    return this.vehicles.find(v => v.slug === slug);
  }

  addVehicle(vehicleData: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): Vehicle {
    const now = new Date().toISOString();
    const vehicle: Vehicle = {
      ...vehicleData,
      id: this.generateId(),
      slug: this.generateSlug(vehicleData.brand, vehicleData.model, vehicleData.year),
      createdAt: now,
      updatedAt: now,
    };

    this.vehicles.unshift(vehicle); // Add to beginning
    this.saveVehicles();
    return vehicle;
  }

  updateVehicle(id: string, updates: Partial<Vehicle>): Vehicle | null {
    const index = this.vehicles.findIndex(v => v.id === id);
    if (index === -1) return null;

    const updatedVehicle = {
      ...this.vehicles[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    // Update slug if brand, model, or year changed
    if (updates.brand || updates.model || updates.year) {
      updatedVehicle.slug = this.generateSlug(
        updatedVehicle.brand,
        updatedVehicle.model,
        updatedVehicle.year
      );
    }

    this.vehicles[index] = updatedVehicle;
    this.saveVehicles();
    return updatedVehicle;
  }

  deleteVehicle(id: string): boolean {
    const index = this.vehicles.findIndex(v => v.id === id);
    if (index === -1) return false;

    this.vehicles.splice(index, 1);
    this.saveVehicles();
    return true;
  }

  // Filtering and Search
  searchVehicles(query: string, filters?: VehicleFilters): Vehicle[] {
    let results = this.vehicles;

    // Text search
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      results = results.filter(vehicle =>
        vehicle.brand.toLowerCase().includes(searchTerm) ||
        vehicle.model.toLowerCase().includes(searchTerm) ||
        vehicle.description.toLowerCase().includes(searchTerm) ||
        vehicle.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply filters
    if (filters) {
      results = this.applyFilters(results, filters);
    }

    return results;
  }

  private applyFilters(vehicles: Vehicle[], filters: VehicleFilters): Vehicle[] {
    return vehicles.filter(vehicle => {
      if (filters.brand && vehicle.brand !== filters.brand) return false;
      if (filters.model && vehicle.model !== filters.model) return false;
      if (filters.yearMin && vehicle.year < filters.yearMin) return false;
      if (filters.yearMax && vehicle.year > filters.yearMax) return false;
      if (filters.priceMin && vehicle.price < filters.priceMin) return false;
      if (filters.priceMax && vehicle.price > filters.priceMax) return false;
      if (filters.mileageMax && vehicle.mileage > filters.mileageMax) return false;
      if (filters.fuel && !filters.fuel.includes(vehicle.fuel)) return false;
      if (filters.transmission && !filters.transmission.includes(vehicle.transmission)) return false;
      if (filters.bodyType && !filters.bodyType.includes(vehicle.bodyType)) return false;
      if (filters.status && !filters.status.includes(vehicle.status)) return false;
      if (filters.location && vehicle.location !== filters.location) return false;
      if (filters.isNew !== undefined && vehicle.isNew !== filters.isNew) return false;
      if (filters.isFeatured !== undefined && vehicle.isFeatured !== filters.isFeatured) return false;
      
      return true;
    });
  }

  // Statistics
  getStats(): VehicleStats {
    const total = this.vehicles.length;
    const available = this.vehicles.filter(v => v.status === 'available').length;
    const sold = this.vehicles.filter(v => v.status === 'sold').length;
    const reserved = this.vehicles.filter(v => v.status === 'reserved').length;
    const maintenance = this.vehicles.filter(v => v.status === 'maintenance').length;
    const newVehicles = this.vehicles.filter(v => v.isNew).length;
    const usedVehicles = total - newVehicles;
    const featuredVehicles = this.vehicles.filter(v => v.isFeatured).length;
    
    const availableVehicles = this.vehicles.filter(v => v.status === 'available');
    const averagePrice = availableVehicles.length > 0 
      ? availableVehicles.reduce((sum, v) => sum + v.price, 0) / availableVehicles.length 
      : 0;
    
    const totalValue = availableVehicles.reduce((sum, v) => sum + v.price, 0);

    return {
      total,
      available,
      sold,
      reserved,
      maintenance,
      averagePrice,
      totalValue,
      newVehicles,
      usedVehicles,
      featuredVehicles,
    };
  }

  // Utility Methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private generateSlug(brand: string, model: string, year: number): string {
    return `${brand}-${model}-${year}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  getBrands(): string[] {
    const brands = [...new Set(this.vehicles.map(v => v.brand))];
    return brands.sort();
  }

  getModels(brand?: string): string[] {
    const vehicles = brand ? this.vehicles.filter(v => v.brand === brand) : this.vehicles;
    const models = [...new Set(vehicles.map(v => v.model))];
    return models.sort();
  }

  getYears(): number[] {
    const years = [...new Set(this.vehicles.map(v => v.year))];
    return years.sort((a, b) => b - a);
  }

  getLocations(): string[] {
    const locations = [...new Set(this.vehicles.map(v => v.location))];
    return locations.sort();
  }

  // Sample Data
  private getSampleVehicles(): Vehicle[] {
    const now = new Date().toISOString();
    
    return [
      {
        id: '1',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2021,
        price: 18500000,
        mileage: 45000,
        fuel: 'Gasolina',
        transmission: 'Automática',
        bodyType: 'Sedán',
        status: 'available',
        isNew: false,
        isFeatured: true,
        location: 'Buin',
        images: ['https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&h=600&fit=crop'],
        mainImage: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&h=600&fit=crop',
        description: 'Toyota Corolla en excelente estado, mantenimiento al día, único dueño.',
        features: ['Aire Acondicionado', 'Dirección Asistida', 'Vidrios Eléctricos', 'Radio CD'],
        condition: 'Excelente',
        engine: '1.8L',
        doors: 4,
        seats: 5,
        color: 'Blanco',
        createdAt: now,
        updatedAt: now,
        slug: 'toyota-corolla-2021',
        tags: ['sedán', 'económico', 'confiable'],
        financing: {
          available: true,
          minDownPayment: 3700000,
          maxTerms: 60
        }
      },
      {
        id: '2',
        brand: 'BMW',
        model: 'X3',
        year: 2022,
        price: 35000000,
        mileage: 25000,
        fuel: 'Gasolina',
        transmission: 'Automática',
        bodyType: 'SUV',
        status: 'available',
        isNew: true,
        isFeatured: true,
        location: 'Santiago',
        images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'],
        mainImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
        description: 'BMW X3 nuevo, con todas las características premium y garantía de fábrica.',
        features: ['Cuero', 'Navegación GPS', 'Cámara Trasera', 'Sensores de Estacionamiento', 'Techo Solar'],
        condition: 'Excelente',
        engine: '2.0L Turbo',
        doors: 5,
        seats: 5,
        color: 'Negro',
        createdAt: now,
        updatedAt: now,
        slug: 'bmw-x3-2022',
        tags: ['suv', 'premium', 'nuevo'],
        financing: {
          available: true,
          minDownPayment: 7000000,
          maxTerms: 72
        }
      },
      {
        id: '3',
        brand: 'Honda',
        model: 'Civic',
        year: 2020,
        price: 16000000,
        mileage: 60000,
        fuel: 'Gasolina',
        transmission: 'Manual',
        bodyType: 'Hatchback',
        status: 'available',
        isNew: false,
        isFeatured: false,
        location: 'Buin',
        images: ['https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop'],
        mainImage: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
        description: 'Honda Civic confiable y económico, perfecto para uso diario.',
        features: ['Aire Acondicionado', 'Radio Bluetooth', 'Vidrios Eléctricos'],
        condition: 'Muy Bueno',
        engine: '1.5L',
        doors: 5,
        seats: 5,
        color: 'Azul',
        createdAt: now,
        updatedAt: now,
        slug: 'honda-civic-2020',
        tags: ['hatchback', 'económico', 'confiable'],
        financing: {
          available: true,
          minDownPayment: 3200000,
          maxTerms: 48
        }
      },
      {
        id: '4',
        brand: 'Mercedes',
        model: 'C200',
        year: 2019,
        price: 28000000,
        mileage: 80000,
        fuel: 'Gasolina',
        transmission: 'Automática',
        bodyType: 'Sedán',
        status: 'available',
        isNew: false,
        isFeatured: true,
        location: 'Santiago',
        images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop'],
        mainImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
        description: 'Mercedes-Benz C200 de lujo, equipado con todas las comodidades premium.',
        features: ['Cuero', 'Navegación GPS', 'Cámara Trasera', 'Asientos Calefaccionados', 'Control de Crucero'],
        condition: 'Excelente',
        engine: '2.0L Turbo',
        doors: 4,
        seats: 5,
        color: 'Gris Metalizado',
        createdAt: now,
        updatedAt: now,
        slug: 'mercedes-c200-2019',
        tags: ['sedán', 'lujo', 'premium'],
        financing: {
          available: true,
          minDownPayment: 5600000,
          maxTerms: 60
        }
      },
      {
        id: '5',
        brand: 'Hyundai',
        model: 'Tucson',
        year: 2021,
        price: 22000000,
        mileage: 35000,
        fuel: 'Gasolina',
        transmission: 'Automática',
        bodyType: 'SUV',
        status: 'available',
        isNew: false,
        isFeatured: false,
        location: 'Buin',
        images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop'],
        mainImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop',
        description: 'Hyundai Tucson SUV familiar, espacioso y seguro para toda la familia.',
        features: ['7 Airbags', 'Control de Estabilidad', 'Aire Acondicionado', 'Bluetooth'],
        condition: 'Muy Bueno',
        engine: '2.0L',
        doors: 5,
        seats: 5,
        color: 'Blanco Perla',
        createdAt: now,
        updatedAt: now,
        slug: 'hyundai-tucson-2021',
        tags: ['suv', 'familiar', 'seguro'],
        financing: {
          available: true,
          minDownPayment: 4400000,
          maxTerms: 60
        }
      },
      {
        id: '6',
        brand: 'Audi',
        model: 'A4',
        year: 2020,
        price: 32000000,
        mileage: 50000,
        fuel: 'Gasolina',
        transmission: 'Automática',
        bodyType: 'Sedán',
        status: 'sold',
        isNew: false,
        isFeatured: false,
        location: 'Santiago',
        images: ['https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&h=600&fit=crop'],
        mainImage: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&h=600&fit=crop',
        description: 'Audi A4 deportivo y elegante, con tecnología avanzada.',
        features: ['Cuero', 'Navegación', 'Cámara 360°', 'Asientos Deportivos', 'LED'],
        condition: 'Excelente',
        engine: '2.0L TFSI',
        doors: 4,
        seats: 5,
        color: 'Negro',
        createdAt: now,
        updatedAt: now,
        soldAt: now,
        slug: 'audi-a4-2020',
        tags: ['sedán', 'deportivo', 'tecnología'],
        financing: {
          available: false
        }
      },
      {
        id: '7',
        brand: 'Chevrolet',
        model: 'Onix',
        year: 2023,
        price: 14500000,
        mileage: 15000,
        fuel: 'Gasolina',
        transmission: 'Manual',
        bodyType: 'Hatchback',
        status: 'available',
        isNew: true,
        isFeatured: true,
        location: 'Santiago',
        images: ['https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop'],
        mainImage: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop',
        description: 'Chevrolet Onix nuevo, ideal para jóvenes conductores.',
        features: ['MyLink', 'Aire Acondicionado', 'Dirección Asistida', 'ABS'],
        condition: 'Excelente',
        engine: '1.0L Turbo',
        doors: 5,
        seats: 5,
        color: 'Rojo',
        createdAt: now,
        updatedAt: now,
        slug: 'chevrolet-onix-2023',
        tags: ['nuevo', 'económico', 'joven'],
        financing: {
          available: true,
          minDownPayment: 2900000,
          maxTerms: 72
        }
      },
      {
        id: '8',
        brand: 'Ford',
        model: 'Ranger',
        year: 2022,
        price: 28500000,
        mileage: 40000,
        fuel: 'Diesel',
        transmission: 'Automática',
        bodyType: 'Pickup',
        status: 'reserved',
        isNew: false,
        isFeatured: true,
        location: 'Buin',
        images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'],
        mainImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        description: 'Ford Ranger 4x4, perfecta para trabajo y aventura.',
        features: ['4x4', 'Barra Antivuelco', 'Ganchos de Remolque', 'Bluetooth'],
        condition: 'Muy Bueno',
        engine: '2.2L TDCi',
        doors: 4,
        seats: 5,
        color: 'Azul Oscuro',
        createdAt: now,
        updatedAt: now,
        slug: 'ford-ranger-2022',
        tags: ['pickup', 'trabajo', '4x4'],
        financing: {
          available: true,
          minDownPayment: 5700000,
          maxTerms: 60
        }
      },
      {
        id: '9',
        brand: 'Nissan',
        model: 'Sentra',
        year: 2021,
        price: 17800000,
        mileage: 38000,
        fuel: 'Gasolina',
        transmission: 'Automática',
        bodyType: 'Sedán',
        status: 'maintenance',
        isNew: false,
        isFeatured: false,
        location: 'Santiago',
        images: ['https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=600&fit=crop'],
        mainImage: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=600&fit=crop',
        description: 'Nissan Sentra en mantenimiento, pronto disponible.',
        features: ['CVT', 'Aire Acondicionado', 'Bluetooth', 'Cámara Trasera'],
        condition: 'Bueno',
        engine: '1.6L',
        doors: 4,
        seats: 5,
        color: 'Plata',
        createdAt: now,
        updatedAt: now,
        slug: 'nissan-sentra-2021',
        tags: ['sedán', 'automático', 'confiable'],
        financing: {
          available: true,
          minDownPayment: 3560000,
          maxTerms: 48
        }
      },
      {
        id: '10',
        brand: 'Volkswagen',
        model: 'Polo',
        year: 2023,
        price: 16200000,
        mileage: 8000,
        fuel: 'Gasolina',
        transmission: 'Manual',
        bodyType: 'Hatchback',
        status: 'available',
        isNew: true,
        isFeatured: false,
        location: 'Santiago',
        images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop'],
        mainImage: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
        description: 'Volkswagen Polo nuevo, calidad alemana a precio accesible.',
        features: ['App-Connect', 'Aire Acondicionado', 'ESP', 'Faros LED'],
        condition: 'Excelente',
        engine: '1.6L MPI',
        doors: 5,
        seats: 5,
        color: 'Blanco',
        createdAt: now,
        updatedAt: now,
        slug: 'volkswagen-polo-2023',
        tags: ['nuevo', 'alemán', 'calidad'],
        financing: {
          available: true,
          minDownPayment: 3240000,
          maxTerms: 60
        }
      }
    ];
  }
}

// Export singleton instance
export const vehicleService = new VehicleService();
export default vehicleService;

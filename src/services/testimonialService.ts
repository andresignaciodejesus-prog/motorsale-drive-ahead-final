export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number; // 1-5 stars
  comment: string;
  vehiclePurchased?: string; // e.g., "Toyota Corolla 2021"
  image?: string; // Profile image URL
  date: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

class TestimonialService {
  private testimonials: Testimonial[] = [];
  private storageKey = 'motorsale_testimonials';

  constructor() {
    this.loadTestimonials();
  }

  private loadTestimonials(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.testimonials = JSON.parse(stored);
      } else {
        // Initialize with sample testimonials
        this.testimonials = this.getSampleTestimonials();
        this.saveTestimonials();
      }
    } catch (error) {
      console.error('Error loading testimonials:', error);
      this.testimonials = this.getSampleTestimonials();
    }
  }

  private saveTestimonials(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.testimonials));
    } catch (error) {
      console.error('Error saving testimonials:', error);
    }
  }

  // CRUD Operations
  getAllTestimonials(): Testimonial[] {
    return [...this.testimonials];
  }

  getActiveTestimonials(): Testimonial[] {
    return this.testimonials.filter(t => t.isActive);
  }

  getTestimonialById(id: string): Testimonial | undefined {
    return this.testimonials.find(t => t.id === id);
  }

  addTestimonial(testimonialData: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Testimonial {
    const now = new Date().toISOString();
    const testimonial: Testimonial = {
      ...testimonialData,
      id: this.generateId(),
      createdAt: now,
      updatedAt: now,
    };

    this.testimonials.unshift(testimonial); // Add to beginning
    this.saveTestimonials();
    return testimonial;
  }

  updateTestimonial(id: string, updates: Partial<Testimonial>): Testimonial | null {
    const index = this.testimonials.findIndex(t => t.id === id);
    if (index === -1) return null;

    const updatedTestimonial = {
      ...this.testimonials[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.testimonials[index] = updatedTestimonial;
    this.saveTestimonials();
    return updatedTestimonial;
  }

  deleteTestimonial(id: string): boolean {
    const index = this.testimonials.findIndex(t => t.id === id);
    if (index === -1) return false;

    this.testimonials.splice(index, 1);
    this.saveTestimonials();
    return true;
  }

  toggleTestimonialStatus(id: string): boolean {
    const testimonial = this.getTestimonialById(id);
    if (!testimonial) return false;

    return this.updateTestimonial(id, { isActive: !testimonial.isActive }) !== null;
  }

  // Utility Methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getStats() {
    const total = this.testimonials.length;
    const active = this.testimonials.filter(t => t.isActive).length;
    const inactive = total - active;
    const averageRating = this.testimonials.length > 0 
      ? this.testimonials.reduce((sum, t) => sum + t.rating, 0) / this.testimonials.length 
      : 0;

    return {
      total,
      active,
      inactive,
      averageRating: Math.round(averageRating * 10) / 10,
    };
  }

  // Sample Data
  private getSampleTestimonials(): Testimonial[] {
    const now = new Date().toISOString();
    
    return [
      {
        id: '1',
        name: 'María González',
        location: 'Santiago',
        rating: 5,
        comment: 'Excelente servicio, encontré el auto perfecto para mi familia. El proceso fue muy transparente y profesional.',
        vehiclePurchased: 'Toyota Corolla 2021',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        date: '2024-01-15',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: '2',
        name: 'Carlos Rodríguez',
        location: 'Buin',
        rating: 5,
        comment: 'Motor Sale me ayudó a vender mi auto rápidamente y a un buen precio. Muy recomendado.',
        vehiclePurchased: 'BMW X3 2022',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        date: '2024-01-10',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: '3',
        name: 'Ana Martínez',
        location: 'Santiago',
        rating: 4,
        comment: 'Muy buena atención al cliente. El equipo es muy profesional y me ayudaron en todo el proceso.',
        vehiclePurchased: 'Honda Civic 2020',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        date: '2024-01-08',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: '4',
        name: 'Roberto Silva',
        location: 'Buin',
        rating: 5,
        comment: 'Compré mi primer auto aquí y la experiencia fue increíble. Muy transparentes con todos los detalles.',
        vehiclePurchased: 'Chevrolet Onix 2023',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        date: '2024-01-05',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ];
  }
}

// Export singleton instance
export const testimonialService = new TestimonialService();
export default testimonialService;

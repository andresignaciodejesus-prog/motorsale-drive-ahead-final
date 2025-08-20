import { useState, useEffect, useCallback } from 'react';
import { testimonialService, Testimonial } from '@/services/testimonialService';

export interface UseTestimonialsReturn {
  testimonials: Testimonial[];
  activeTestimonials: Testimonial[];
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    active: number;
    inactive: number;
    averageRating: number;
  };
  
  // CRUD operations
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Testimonial>;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => Promise<Testimonial | null>;
  deleteTestimonial: (id: string) => Promise<boolean>;
  toggleTestimonialStatus: (id: string) => Promise<boolean>;
  getTestimonialById: (id: string) => Testimonial | undefined;
  
  // Refresh data
  refresh: () => void;
}

export const useTestimonials = (): UseTestimonialsReturn => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    averageRating: 0,
  });

  const loadTestimonials = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      
      const allTestimonials = testimonialService.getAllTestimonials();
      const testimonialStats = testimonialService.getStats();
      
      setTestimonials(allTestimonials);
      setStats(testimonialStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading testimonials');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  const activeTestimonials = testimonials.filter(t => t.isActive);

  const addTestimonial = useCallback(async (testimonialData: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<Testimonial> => {
    try {
      setError(null);
      const newTestimonial = testimonialService.addTestimonial(testimonialData);
      loadTestimonials(); // Refresh data
      return newTestimonial;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error adding testimonial';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [loadTestimonials]);

  const updateTestimonial = useCallback(async (id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> => {
    try {
      setError(null);
      const updatedTestimonial = testimonialService.updateTestimonial(id, updates);
      if (updatedTestimonial) {
        loadTestimonials(); // Refresh data
      }
      return updatedTestimonial;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating testimonial';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [loadTestimonials]);

  const deleteTestimonial = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      const success = testimonialService.deleteTestimonial(id);
      if (success) {
        loadTestimonials(); // Refresh data
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error deleting testimonial';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [loadTestimonials]);

  const toggleTestimonialStatus = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      const success = testimonialService.toggleTestimonialStatus(id);
      if (success) {
        loadTestimonials(); // Refresh data
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error toggling testimonial status';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [loadTestimonials]);

  const getTestimonialById = useCallback((id: string): Testimonial | undefined => {
    return testimonialService.getTestimonialById(id);
  }, []);

  const refresh = useCallback(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  return {
    testimonials,
    activeTestimonials,
    loading,
    error,
    stats,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    toggleTestimonialStatus,
    getTestimonialById,
    refresh,
  };
};

export default useTestimonials;

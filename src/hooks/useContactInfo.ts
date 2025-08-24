import { useState, useEffect, useCallback } from 'react';
import { contactInfoService, ContactInfo } from '@/services/contactInfoService';

export interface UseContactInfoReturn {
  contactInfo: ContactInfo;
  loading: boolean;
  error: string | null;
  
  // Update operations
  updateContactInfo: (updates: Partial<ContactInfo>) => Promise<ContactInfo>;
  updateBusinessHours: (day: keyof ContactInfo['businessHours'], hours: { open: string; close: string; closed?: boolean }) => Promise<ContactInfo>;
  updateSocialMedia: (platform: keyof ContactInfo['socialMedia'], url: string) => Promise<ContactInfo>;
  
  // Utility methods
  getFormattedPhone: () => string;
  getWhatsAppLink: () => string;
  getFormattedAddress: () => string;
  isOpenNow: () => boolean;
  getTodayHours: () => string;
  resetToDefaults: () => Promise<ContactInfo>;
  
  // Refresh data
  refresh: () => void;
}

export const useContactInfo = (): UseContactInfoReturn => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({} as ContactInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContactInfo = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      
      const info = contactInfoService.getContactInfo();
      setContactInfo(info);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading contact info');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContactInfo();
  }, [loadContactInfo]);

  const updateContactInfo = useCallback(async (updates: Partial<ContactInfo>): Promise<ContactInfo> => {
    try {
      setError(null);
      const updatedInfo = contactInfoService.updateContactInfo(updates);
      setContactInfo(updatedInfo);
      return updatedInfo;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating contact info';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const updateBusinessHours = useCallback(async (day: keyof ContactInfo['businessHours'], hours: { open: string; close: string; closed?: boolean }): Promise<ContactInfo> => {
    try {
      setError(null);
      const updatedInfo = contactInfoService.updateBusinessHours(day, hours);
      setContactInfo(updatedInfo);
      return updatedInfo;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating business hours';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const updateSocialMedia = useCallback(async (platform: keyof ContactInfo['socialMedia'], url: string): Promise<ContactInfo> => {
    try {
      setError(null);
      const updatedInfo = contactInfoService.updateSocialMedia(platform, url);
      setContactInfo(updatedInfo);
      return updatedInfo;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating social media';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const getFormattedPhone = useCallback((): string => {
    return contactInfoService.getFormattedPhone();
  }, []);

  const getWhatsAppLink = useCallback((): string => {
    return contactInfoService.getWhatsAppLink();
  }, []);

  const getFormattedAddress = useCallback((): string => {
    return contactInfoService.getFormattedAddress();
  }, []);

  const isOpenNow = useCallback((): boolean => {
    return contactInfoService.isOpenNow();
  }, []);

  const getTodayHours = useCallback((): string => {
    return contactInfoService.getTodayHours();
  }, []);

  const resetToDefaults = useCallback(async (): Promise<ContactInfo> => {
    try {
      setError(null);
      const defaultInfo = contactInfoService.resetToDefaults();
      setContactInfo(defaultInfo);
      return defaultInfo;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error resetting to defaults';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const refresh = useCallback(() => {
    loadContactInfo();
  }, [loadContactInfo]);

  return {
    contactInfo,
    loading,
    error,
    updateContactInfo,
    updateBusinessHours,
    updateSocialMedia,
    getFormattedPhone,
    getWhatsAppLink,
    getFormattedAddress,
    isOpenNow,
    getTodayHours,
    resetToDefaults,
    refresh,
  };
};

export default useContactInfo;

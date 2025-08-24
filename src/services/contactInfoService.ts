export interface ContactInfo {
  // Basic Contact
  phone: string;
  email: string;
  whatsapp: string;
  
  // Address
  address: string;
  city: string;
  region: string;
  country: string;
  
  // Business Hours
  businessHours: {
    monday: { open: string; close: string; closed?: boolean };
    tuesday: { open: string; close: string; closed?: boolean };
    wednesday: { open: string; close: string; closed?: boolean };
    thursday: { open: string; close: string; closed?: boolean };
    friday: { open: string; close: string; closed?: boolean };
    saturday: { open: string; close: string; closed?: boolean };
    sunday: { open: string; close: string; closed?: boolean };
  };
  
  // Social Media
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  
  // Company Info
  companyName: string;
  companyDescription: string;
  
  // SEO
  metaTitle: string;
  metaDescription: string;
  
  // Updated timestamp
  updatedAt: string;
}

class ContactInfoService {
  private contactInfo: ContactInfo;
  private storageKey = 'motorsale_contact_info';

  constructor() {
    this.contactInfo = this.loadContactInfo();
  }

  private loadContactInfo(): ContactInfo {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      } else {
        // Initialize with default contact info
        const defaultInfo = this.getDefaultContactInfo();
        this.saveContactInfo(defaultInfo);
        return defaultInfo;
      }
    } catch (error) {
      console.error('Error loading contact info:', error);
      return this.getDefaultContactInfo();
    }
  }

  private saveContactInfo(contactInfo: ContactInfo): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(contactInfo));
      this.contactInfo = contactInfo;
    } catch (error) {
      console.error('Error saving contact info:', error);
    }
  }

  // Public Methods
  getContactInfo(): ContactInfo {
    return { ...this.contactInfo };
  }

  updateContactInfo(updates: Partial<ContactInfo>): ContactInfo {
    const updatedInfo: ContactInfo = {
      ...this.contactInfo,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.saveContactInfo(updatedInfo);
    return updatedInfo;
  }

  updateBusinessHours(day: keyof ContactInfo['businessHours'], hours: { open: string; close: string; closed?: boolean }): ContactInfo {
    const updatedInfo: ContactInfo = {
      ...this.contactInfo,
      businessHours: {
        ...this.contactInfo.businessHours,
        [day]: hours,
      },
      updatedAt: new Date().toISOString(),
    };

    this.saveContactInfo(updatedInfo);
    return updatedInfo;
  }

  updateSocialMedia(platform: keyof ContactInfo['socialMedia'], url: string): ContactInfo {
    const updatedInfo: ContactInfo = {
      ...this.contactInfo,
      socialMedia: {
        ...this.contactInfo.socialMedia,
        [platform]: url,
      },
      updatedAt: new Date().toISOString(),
    };

    this.saveContactInfo(updatedInfo);
    return updatedInfo;
  }

  // Utility Methods
  getFormattedPhone(): string {
    const phone = this.contactInfo.phone.replace(/\D/g, '');
    if (phone.startsWith('56')) {
      return `+${phone.slice(0, 2)} ${phone.slice(2, 3)} ${phone.slice(3, 7)} ${phone.slice(7)}`;
    }
    return this.contactInfo.phone;
  }

  getWhatsAppLink(): string {
    const phone = this.contactInfo.whatsapp.replace(/\D/g, '');
    return `https://wa.me/${phone}`;
  }

  getFormattedAddress(): string {
    return `${this.contactInfo.address}, ${this.contactInfo.city}, ${this.contactInfo.region}, ${this.contactInfo.country}`;
  }

  isOpenNow(): boolean {
    const now = new Date();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = days[now.getDay()] as keyof ContactInfo['businessHours'];
    const daySchedule = this.contactInfo.businessHours[currentDay];
    
    if (daySchedule.closed) return false;
    
    const currentTime = now.getHours() * 100 + now.getMinutes();
    const openTime = parseInt(daySchedule.open.replace(':', ''));
    const closeTime = parseInt(daySchedule.close.replace(':', ''));
    
    return currentTime >= openTime && currentTime <= closeTime;
  }

  getTodayHours(): string {
    const now = new Date();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[now.getDay()] as keyof ContactInfo['businessHours'];
    const todaySchedule = this.contactInfo.businessHours[today];
    
    if (todaySchedule.closed) return 'Cerrado';
    return `${todaySchedule.open} - ${todaySchedule.close}`;
  }

  // Default Data
  private getDefaultContactInfo(): ContactInfo {
    return {
      phone: '+56977587288',
      email: 'motorsale.cl@gmail.com',
      whatsapp: '+56977587288',
      
      address: 'camino el arpa 825 lote 127',
      city: 'buin',
      region: 'Región Metropolitana',
      country: 'Chile',
      
      businessHours: {
        monday: { open: '09:00', close: '18:00' },
        tuesday: { open: '09:00', close: '18:00' },
        wednesday: { open: '09:00', close: '18:00' },
        thursday: { open: '09:00', close: '18:00' },
        friday: { open: '09:00', close: '18:00' },
        saturday: { open: '09:00', close: '14:00' },
        sunday: { open: '10:00', close: '14:00', closed: true },
      },
      
      socialMedia: {
        facebook: 'https://facebook.com/motorsale',
        instagram: 'https://instagram.com/motorsale',
        twitter: '',
        linkedin: '',
        youtube: '',
      },
      
      companyName: 'Motor Sale',
      companyDescription: 'Tu concesionaria de confianza en Buin. Compramos y vendemos vehículos usados y nuevos con la mejor atención al cliente.',
      
      metaTitle: 'Motor Sale - Compra y Venta de Vehículos en Buin',
      metaDescription: 'Encuentra el auto perfecto en Motor Sale. Amplio inventario de vehículos usados y nuevos en Buin. Financiamiento disponible.',
      
      updatedAt: new Date().toISOString(),
    };
  }

  // Reset to defaults (useful for testing)
  resetToDefaults(): ContactInfo {
    const defaultInfo = this.getDefaultContactInfo();
    this.saveContactInfo(defaultInfo);
    return defaultInfo;
  }
}

// Export singleton instance
export const contactInfoService = new ContactInfoService();
export default contactInfoService;

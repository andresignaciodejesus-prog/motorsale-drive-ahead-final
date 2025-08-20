import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Globe, Building, Save, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ContactInfo } from '@/services/contactInfoService';

interface ContactInfoFormProps {
  contactInfo: ContactInfo;
  onUpdate: (updates: Partial<ContactInfo>) => Promise<void>;
  onReset: () => Promise<void>;
  loading?: boolean;
}

export const ContactInfoForm: React.FC<ContactInfoFormProps> = ({
  contactInfo,
  onUpdate,
  onReset,
  loading = false,
}) => {
  const [formData, setFormData] = useState<ContactInfo>(contactInfo);
  const [activeTab, setActiveTab] = useState('basic');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setFormData(contactInfo);
    setHasChanges(false);
  }, [contactInfo]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev };
      const keys = field.split('.');
      
      if (keys.length === 1) {
        updated[keys[0] as keyof ContactInfo] = value;
      } else if (keys.length === 2) {
        (updated as any)[keys[0]][keys[1]] = value;
      } else if (keys.length === 3) {
        (updated as any)[keys[0]][keys[1]][keys[2]] = value;
      }
      
      return updated;
    });
    setHasChanges(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(formData);
    setHasChanges(false);
  };

  const handleReset = async () => {
    if (window.confirm('¿Estás seguro de que quieres restablecer toda la información de contacto a los valores por defecto?')) {
      await onReset();
      setHasChanges(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Información Básica', icon: Phone },
    { id: 'address', label: 'Dirección', icon: MapPin },
    { id: 'hours', label: 'Horarios', icon: Clock },
    { id: 'social', label: 'Redes Sociales', icon: Globe },
    { id: 'company', label: 'Empresa', icon: Building },
  ];

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="phone">Teléfono Principal *</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+56934455147"
              className="pl-10"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="whatsapp"
              value={formData.whatsapp}
              onChange={(e) => handleInputChange('whatsapp', e.target.value)}
              placeholder="+56934455147"
              className="pl-10"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="email">Email *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="contacto@motorsale.cl"
              className="pl-10"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAddress = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Label htmlFor="address">Dirección *</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Av. Buin 1234"
              className="pl-10"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="city">Ciudad *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="Buin"
            required
          />
        </div>

        <div>
          <Label htmlFor="region">Región *</Label>
          <Input
            id="region"
            value={formData.region}
            onChange={(e) => handleInputChange('region', e.target.value)}
            placeholder="Región Metropolitana"
            required
          />
        </div>

        <div>
          <Label htmlFor="country">País *</Label>
          <Input
            id="country"
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            placeholder="Chile"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderBusinessHours = () => {
    const days = [
      { key: 'monday', label: 'Lunes' },
      { key: 'tuesday', label: 'Martes' },
      { key: 'wednesday', label: 'Miércoles' },
      { key: 'thursday', label: 'Jueves' },
      { key: 'friday', label: 'Viernes' },
      { key: 'saturday', label: 'Sábado' },
      { key: 'sunday', label: 'Domingo' },
    ];

    return (
      <div className="space-y-4">
        {days.map(day => (
          <div key={day.key} className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="w-20">
              <Label className="font-medium">{day.label}</Label>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!formData.businessHours[day.key as keyof typeof formData.businessHours].closed}
                onChange={(e) => handleInputChange(`businessHours.${day.key}.closed`, !e.target.checked)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <Label className="text-sm">Abierto</Label>
            </div>

            {!formData.businessHours[day.key as keyof typeof formData.businessHours].closed && (
              <>
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Desde:</Label>
                  <Input
                    type="time"
                    value={formData.businessHours[day.key as keyof typeof formData.businessHours].open}
                    onChange={(e) => handleInputChange(`businessHours.${day.key}.open`, e.target.value)}
                    className="w-32"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Hasta:</Label>
                  <Input
                    type="time"
                    value={formData.businessHours[day.key as keyof typeof formData.businessHours].close}
                    onChange={(e) => handleInputChange(`businessHours.${day.key}.close`, e.target.value)}
                    className="w-32"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSocialMedia = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="facebook">Facebook</Label>
          <Input
            id="facebook"
            value={formData.socialMedia.facebook || ''}
            onChange={(e) => handleInputChange('socialMedia.facebook', e.target.value)}
            placeholder="https://facebook.com/motorsale"
          />
        </div>

        <div>
          <Label htmlFor="instagram">Instagram</Label>
          <Input
            id="instagram"
            value={formData.socialMedia.instagram || ''}
            onChange={(e) => handleInputChange('socialMedia.instagram', e.target.value)}
            placeholder="https://instagram.com/motorsale"
          />
        </div>

        <div>
          <Label htmlFor="twitter">Twitter</Label>
          <Input
            id="twitter"
            value={formData.socialMedia.twitter || ''}
            onChange={(e) => handleInputChange('socialMedia.twitter', e.target.value)}
            placeholder="https://twitter.com/motorsale"
          />
        </div>

        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={formData.socialMedia.linkedin || ''}
            onChange={(e) => handleInputChange('socialMedia.linkedin', e.target.value)}
            placeholder="https://linkedin.com/company/motorsale"
          />
        </div>

        <div>
          <Label htmlFor="youtube">YouTube</Label>
          <Input
            id="youtube"
            value={formData.socialMedia.youtube || ''}
            onChange={(e) => handleInputChange('socialMedia.youtube', e.target.value)}
            placeholder="https://youtube.com/motorsale"
          />
        </div>
      </div>
    </div>
  );

  const renderCompanyInfo = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="companyName">Nombre de la Empresa *</Label>
        <Input
          id="companyName"
          value={formData.companyName}
          onChange={(e) => handleInputChange('companyName', e.target.value)}
          placeholder="Motor Sale"
          required
        />
      </div>

      <div>
        <Label htmlFor="companyDescription">Descripción de la Empresa</Label>
        <Textarea
          id="companyDescription"
          value={formData.companyDescription}
          onChange={(e) => handleInputChange('companyDescription', e.target.value)}
          placeholder="Tu concesionaria de confianza en Buin..."
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="metaTitle">Título SEO</Label>
        <Input
          id="metaTitle"
          value={formData.metaTitle}
          onChange={(e) => handleInputChange('metaTitle', e.target.value)}
          placeholder="Motor Sale - Compra y Venta de Vehículos en Buin"
        />
      </div>

      <div>
        <Label htmlFor="metaDescription">Descripción SEO</Label>
        <Textarea
          id="metaDescription"
          value={formData.metaDescription}
          onChange={(e) => handleInputChange('metaDescription', e.target.value)}
          placeholder="Encuentra el auto perfecto en Motor Sale..."
          rows={3}
        />
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic': return renderBasicInfo();
      case 'address': return renderAddress();
      case 'hours': return renderBusinessHours();
      case 'social': return renderSocialMedia();
      case 'company': return renderCompanyInfo();
      default: return renderBasicInfo();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Información de Contacto
          </h3>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={loading}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Restablecer
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6">
        {renderTabContent()}

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t mt-6">
          {hasChanges && (
            <span className="text-sm text-amber-600">
              Tienes cambios sin guardar
            </span>
          )}
          <Button
            type="submit"
            disabled={loading || !hasChanges}
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactInfoForm;

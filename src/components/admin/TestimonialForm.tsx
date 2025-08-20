import React, { useState, useEffect } from 'react';
import { Star, User, MapPin, Car, Calendar, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Testimonial } from '@/services/testimonialService';

interface TestimonialFormProps {
  testimonial?: Testimonial;
  onSubmit: (testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const TestimonialForm: React.FC<TestimonialFormProps> = ({
  testimonial,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    comment: '',
    vehiclePurchased: '',
    image: '',
    date: new Date().toISOString().split('T')[0],
    isActive: true,
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        location: testimonial.location,
        rating: testimonial.rating,
        comment: testimonial.comment,
        vehiclePurchased: testimonial.vehiclePurchased || '',
        image: testimonial.image || '',
        date: testimonial.date,
        isActive: testimonial.isActive,
      });
    }
  }, [testimonial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleInputChange('rating', star)}
            className={`p-1 rounded transition-colors ${
              star <= formData.rating
                ? 'text-yellow-500 hover:text-yellow-600'
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {formData.rating} de 5 estrellas
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {testimonial ? 'Editar Testimonio' : 'Agregar Testimonio'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Información Personal */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <User className="w-4 h-4" />
              Información Personal
            </h4>
            
            <div>
              <Label htmlFor="name">Nombre Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ej: María González"
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Ubicación *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Ej: Santiago, Buin"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image">Foto de Perfil (URL)</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="https://ejemplo.com/foto.jpg"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="date">Fecha del Testimonio</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Información del Testimonio */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Testimonio
            </h4>

            <div>
              <Label>Calificación *</Label>
              {renderStarRating()}
            </div>

            <div>
              <Label htmlFor="vehiclePurchased">Vehículo Comprado</Label>
              <div className="relative">
                <Car className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="vehiclePurchased"
                  value={formData.vehiclePurchased}
                  onChange={(e) => handleInputChange('vehiclePurchased', e.target.value)}
                  placeholder="Ej: Toyota Corolla 2021"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="comment">Comentario *</Label>
              <Textarea
                id="comment"
                value={formData.comment}
                onChange={(e) => handleInputChange('comment', e.target.value)}
                placeholder="Escribe el testimonio del cliente..."
                rows={6}
                required
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.comment.length}/500 caracteres
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <Label htmlFor="isActive">Testimonio activo (visible en el sitio)</Label>
            </div>
          </div>
        </div>

        {/* Vista Previa */}
        <div className="border-t pt-6">
          <h4 className="font-medium text-gray-900 mb-4">Vista Previa</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-4">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt={formData.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-medium text-gray-900">
                    {formData.name || 'Nombre del cliente'}
                  </h5>
                  <span className="text-sm text-gray-500">
                    • {formData.location || 'Ubicación'}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= formData.rating
                          ? 'text-yellow-500 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-2">
                  {formData.comment || 'El comentario aparecerá aquí...'}
                </p>
                {formData.vehiclePurchased && (
                  <p className="text-xs text-gray-500">
                    Vehículo: {formData.vehiclePurchased}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading || !formData.name || !formData.location || !formData.comment}
          >
            {loading ? 'Guardando...' : testimonial ? 'Actualizar' : 'Agregar'} Testimonio
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TestimonialForm;

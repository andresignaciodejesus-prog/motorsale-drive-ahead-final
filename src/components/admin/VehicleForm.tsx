import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Vehicle } from '@/services/vehicleService';
import { Upload, X, Plus } from 'lucide-react';

interface VehicleFormProps {
  vehicle?: Vehicle | null;
  onSubmit: (vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt' | 'slug'>) => void;
  onCancel: () => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ vehicle, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    fuel: 'Gasolina' as Vehicle['fuel'],
    transmission: 'Manual' as Vehicle['transmission'],
    bodyType: 'Sedán' as Vehicle['bodyType'],
    status: 'available' as Vehicle['status'],
    isNew: false,
    isFeatured: false,
    location: 'Santiago',
    dealerName: '',
    dealerPhone: '',
    images: [] as string[],
    mainImage: '',
    description: '',
    features: [] as string[],
    condition: 'Excelente' as Vehicle['condition'],
    engine: '',
    doors: 4,
    seats: 5,
    color: '',
    tags: [] as string[],
    originalPrice: undefined as number | undefined,
    discount: undefined as number | undefined,
    financing: {
      available: false,
      minDownPayment: undefined as number | undefined,
      maxTerms: undefined as number | undefined,
    },
  });

  const [newFeature, setNewFeature] = useState('');
  const [newTag, setNewTag] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (vehicle) {
      setFormData({
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
        mileage: vehicle.mileage,
        fuel: vehicle.fuel,
        transmission: vehicle.transmission,
        bodyType: vehicle.bodyType,
        status: vehicle.status,
        isNew: vehicle.isNew,
        isFeatured: vehicle.isFeatured,
        location: vehicle.location,
        dealerName: vehicle.dealerName || '',
        dealerPhone: vehicle.dealerPhone || '',
        images: vehicle.images,
        mainImage: vehicle.mainImage,
        description: vehicle.description,
        features: vehicle.features,
        condition: vehicle.condition,
        engine: vehicle.engine,
        doors: vehicle.doors,
        seats: vehicle.seats,
        color: vehicle.color,
        tags: vehicle.tags,
        originalPrice: vehicle.originalPrice,
        discount: vehicle.discount,
        financing: vehicle.financing || {
          available: false,
          minDownPayment: undefined,
          maxTerms: undefined,
        },
      });
    }
  }, [vehicle]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFinancingChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      financing: {
        ...prev.financing,
        [field]: value,
      },
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const addImage = () => {
    if (imageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()],
        mainImage: prev.mainImage || imageUrl.trim(), // Set as main if it's the first image
      }));
      setImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => {
      const newImages = prev.images.filter((_, i) => i !== index);
      return {
        ...prev,
        images: newImages,
        mainImage: prev.mainImage === prev.images[index] 
          ? (newImages[0] || '') 
          : prev.mainImage,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="brand">Marca *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                placeholder="Toyota, BMW, etc."
                required
              />
            </div>
            <div>
              <Label htmlFor="model">Modelo *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                placeholder="Corolla, X3, etc."
                required
              />
            </div>
            <div>
              <Label htmlFor="year">Año *</Label>
              <Input
                id="year"
                type="number"
                min="1990"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Precio (CLP) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseInt(e.target.value))}
                placeholder="18500000"
                required
              />
            </div>
            <div>
              <Label htmlFor="mileage">Kilometraje *</Label>
              <Input
                id="mileage"
                type="number"
                min="0"
                value={formData.mileage}
                onChange={(e) => handleInputChange('mileage', parseInt(e.target.value))}
                placeholder="45000"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle>Detalles Técnicos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fuel">Combustible</Label>
              <select
                id="fuel"
                value={formData.fuel}
                onChange={(e) => handleInputChange('fuel', e.target.value)}
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="Gasolina">Gasolina</option>
                <option value="Diesel">Diesel</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Eléctrico">Eléctrico</option>
              </select>
            </div>
            <div>
              <Label htmlFor="transmission">Transmisión</Label>
              <select
                id="transmission"
                value={formData.transmission}
                onChange={(e) => handleInputChange('transmission', e.target.value)}
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="Manual">Manual</option>
                <option value="Automática">Automática</option>
              </select>
            </div>
            <div>
              <Label htmlFor="bodyType">Tipo de Carrocería</Label>
              <select
                id="bodyType"
                value={formData.bodyType}
                onChange={(e) => handleInputChange('bodyType', e.target.value)}
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="Sedán">Sedán</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Pickup">Pickup</option>
                <option value="Convertible">Convertible</option>
                <option value="Coupé">Coupé</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="engine">Motor</Label>
              <Input
                id="engine"
                value={formData.engine}
                onChange={(e) => handleInputChange('engine', e.target.value)}
                placeholder="1.8L, 2.0L Turbo, etc."
              />
            </div>
            <div>
              <Label htmlFor="doors">Puertas</Label>
              <Input
                id="doors"
                type="number"
                min="2"
                max="5"
                value={formData.doors}
                onChange={(e) => handleInputChange('doors', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="seats">Asientos</Label>
              <Input
                id="seats"
                type="number"
                min="2"
                max="9"
                value={formData.seats}
                onChange={(e) => handleInputChange('seats', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                placeholder="Blanco, Negro, etc."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status and Location */}
      <Card>
        <CardHeader>
          <CardTitle>Estado y Ubicación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="status">Estado</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="available">Disponible</option>
                <option value="sold">Vendido</option>
                <option value="reserved">Reservado</option>
                <option value="maintenance">Mantenimiento</option>
              </select>
            </div>
            <div>
              <Label htmlFor="condition">Condición</Label>
              <select
                id="condition"
                value={formData.condition}
                onChange={(e) => handleInputChange('condition', e.target.value)}
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="Excelente">Excelente</option>
                <option value="Muy Bueno">Muy Bueno</option>
                <option value="Bueno">Bueno</option>
                <option value="Regular">Regular</option>
              </select>
            </div>
            <div>
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Santiago, Buin, etc."
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => handleInputChange('isNew', e.target.checked)}
                className="rounded border-gray-300"
              />
              <span>Vehículo Nuevo</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                className="rounded border-gray-300"
              />
              <span>Destacado</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>Imágenes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="URL de la imagen"
              className="flex-1"
            />
            <Button type="button" onClick={addImage}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-24 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="h-3 w-3" />
                </button>
                {image === formData.mainImage && (
                  <div className="absolute bottom-1 left-1 bg-primary text-white text-xs px-2 py-1 rounded">
                    Principal
                  </div>
                )}
              </div>
            ))}
          </div>

          {formData.images.length > 0 && (
            <div>
              <Label htmlFor="mainImage">Imagen Principal</Label>
              <select
                id="mainImage"
                value={formData.mainImage}
                onChange={(e) => handleInputChange('mainImage', e.target.value)}
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                {formData.images.map((image, index) => (
                  <option key={index} value={image}>
                    Imagen {index + 1}
                  </option>
                ))}
              </select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Description and Features */}
      <Card>
        <CardHeader>
          <CardTitle>Descripción y Características</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe el vehículo..."
              rows={4}
            />
          </div>

          <div>
            <Label>Características</Label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Nueva característica"
                className="flex-1"
              />
              <Button type="button" onClick={addFeature}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center space-x-2">
                  <span className="text-sm">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Nuevo tag"
                className="flex-1"
              />
              <Button type="button" onClick={addTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <div key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center space-x-2">
                  <span className="text-sm">{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financing */}
      <Card>
        <CardHeader>
          <CardTitle>Financiamiento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.financing.available}
              onChange={(e) => handleFinancingChange('available', e.target.checked)}
              className="rounded border-gray-300"
            />
            <span>Financiamiento Disponible</span>
          </label>

          {formData.financing.available && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minDownPayment">Pie Mínimo (CLP)</Label>
                <Input
                  id="minDownPayment"
                  type="number"
                  min="0"
                  value={formData.financing.minDownPayment || ''}
                  onChange={(e) => handleFinancingChange('minDownPayment', parseInt(e.target.value) || undefined)}
                  placeholder="3700000"
                />
              </div>
              <div>
                <Label htmlFor="maxTerms">Plazo Máximo (meses)</Label>
                <Input
                  id="maxTerms"
                  type="number"
                  min="12"
                  max="84"
                  value={formData.financing.maxTerms || ''}
                  onChange={(e) => handleFinancingChange('maxTerms', parseInt(e.target.value) || undefined)}
                  placeholder="60"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {vehicle ? 'Actualizar Vehículo' : 'Agregar Vehículo'}
        </Button>
      </div>
    </form>
  );
};

export default VehicleForm;

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Gauge, Fuel } from 'lucide-react';

interface VehicleCardProps {
  id: string;
  image?: string; // Keep for backward compatibility
  mainImage?: string; // New property from inventory system
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  location: string;
  isNew?: boolean;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  id,
  image,
  mainImage,
  brand,
  model,
  year,
  price,
  mileage,
  fuel,
  location,
  isNew = false
}) => {
  // Use mainImage if available, fallback to image for backward compatibility
  const vehicleImage = mainImage || image;
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (km: number) => {
    return new Intl.NumberFormat('es-CL').format(km) + ' km';
  };

  return (
    <div className="bg-card rounded-xl shadow-lg hover-lift border border-border overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img 
          src={vehicleImage} 
          alt={`${brand} ${model} ${year}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isNew && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Nuevo
          </Badge>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background-dark text-white border border-white/20">
            {location}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-text-primary mb-1">
            {brand} {model}
          </h3>
          <p className="text-2xl font-bold text-primary">
            {formatPrice(price)}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-text-secondary text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{year}</span>
          </div>
          <div className="flex items-center text-text-secondary text-sm">
            <Gauge className="h-4 w-4 mr-2" />
            <span>{formatMileage(mileage)}</span>
          </div>
          <div className="flex items-center text-text-secondary text-sm">
            <Fuel className="h-4 w-4 mr-2" />
            <span>{fuel}</span>
          </div>
        </div>

        {/* CTA */}
        <Button 
          className="w-full hover:scale-105 transition-transform"
          variant="outline"
        >
          Ver Detalles
        </Button>
      </div>
    </div>
  );
};

export default VehicleCard;
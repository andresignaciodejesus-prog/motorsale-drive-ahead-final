import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Gauge, Fuel } from 'lucide-react';

interface VehicleCardProps {
  id: string;
  image: string;
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
  brand,
  model,
  year,
  price,
  mileage,
  fuel,
  location,
  isNew = false
}) => {
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
          src={image} 
          alt={`${brand} ${model} ${year}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isNew && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Nuevo
          </Badge>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background-dark/80 text-white">
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
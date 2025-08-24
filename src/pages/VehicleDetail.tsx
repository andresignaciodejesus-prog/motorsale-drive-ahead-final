import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useContactInfo } from '@/hooks/useContactInfo';
import { 
  ArrowLeft, 
  Calendar, 
  Gauge, 
  Fuel, 
  MapPin, 
  Users, 
  Zap, 
  Shield, 
  Car,
  Phone,
  MessageCircle
} from 'lucide-react';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  condition: string;
  type: string;
  location: string;
  image: string;
  description: string;
  features: string[];
  available: boolean;
  createdAt: string;
  // Detalles adicionales
  owners?: number;
  fuelConsumption?: string;
  engineSize?: string;
  power?: string;
  acceleration?: string;
  topSpeed?: string;
  safetyRating?: number;
  warranty?: string;
  lastService?: string;
  nextService?: string;
}

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contactInfo, getWhatsAppLink } = useContactInfo();

  // Obtener vehículo desde localStorage
  const getVehicle = (): Vehicle | null => {
    const saved = localStorage.getItem('motorsale_vehicles');
    if (!saved) return null;
    
    const vehicles: Vehicle[] = JSON.parse(saved);
    return vehicles.find(v => v.id === id) || null;
  };

  const vehicle = getVehicle();

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text-primary mb-2">Vehículo no encontrado</h2>
          <p className="text-text-secondary mb-4">El vehículo que buscas no existe o ha sido removido.</p>
          <Button onClick={() => navigate('/comprar')} className="gradient-primary">
            Ver Todos los Vehículos
          </Button>
        </div>
      </div>
    );
  }

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

  const handleWhatsAppContact = () => {
    const message = `Hola! Me interesa el ${vehicle.brand} ${vehicle.model} ${vehicle.year} por ${formatPrice(vehicle.price)}. ¿Podrían darme más información?`;
    const whatsappUrl = `${getWhatsAppLink()}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneCall = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con botón de regreso */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                {vehicle.brand} {vehicle.model} {vehicle.year}
              </h1>
              <p className="text-text-secondary flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {vehicle.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary mb-2">
                {formatPrice(vehicle.price)}
              </p>
              <Badge variant={vehicle.available ? "default" : "secondary"}>
                {vehicle.available ? "Disponible" : "No Disponible"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal - Imagen y descripción */}
          <div className="lg:col-span-2 space-y-6">
            {/* Imagen principal */}
            <Card>
              <CardContent className="p-0">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Descripción */}
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary leading-relaxed">
                  {vehicle.description || `Excelente ${vehicle.brand} ${vehicle.model} ${vehicle.year} en muy buenas condiciones. Este vehículo ha sido cuidadosamente mantenido y está listo para su nuevo propietario. Ideal para quienes buscan confiabilidad, comodidad y un excelente rendimiento.`}
                </p>
              </CardContent>
            </Card>

            {/* Características */}
            <Card>
              <CardHeader>
                <CardTitle>Características</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {vehicle.features && vehicle.features.length > 0 ? (
                    vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        Aire Acondicionado
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        Dirección Asistida
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        Frenos ABS
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        Airbags
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        Radio/CD
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        Cierre Centralizado
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Detalles técnicos y contacto */}
          <div className="space-y-6">
            {/* Detalles básicos */}
            <Card>
              <CardHeader>
                <CardTitle>Detalles del Vehículo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Año</span>
                  </div>
                  <span className="font-medium">{vehicle.year}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Gauge className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Kilometraje</span>
                  </div>
                  <span className="font-medium">{formatMileage(vehicle.mileage)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Fuel className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Combustible</span>
                  </div>
                  <span className="font-medium">{vehicle.fuel}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Car className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Transmisión</span>
                  </div>
                  <span className="font-medium">{vehicle.transmission}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Dueños</span>
                  </div>
                  <span className="font-medium">{vehicle.owners || 1}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Condición</span>
                  </div>
                  <span className="font-medium">{vehicle.condition}</span>
                </div>
              </CardContent>
            </Card>

            {/* Rendimiento */}
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Fuel className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Consumo</span>
                  </div>
                  <span className="font-medium">{vehicle.fuelConsumption || '8.5L/100km'}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Potencia</span>
                  </div>
                  <span className="font-medium">{vehicle.power || '150 HP'}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Gauge className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Motor</span>
                  </div>
                  <span className="font-medium">{vehicle.engineSize || '1.6L'}</span>
                </div>
              </CardContent>
            </Card>

            {/* Botones de contacto */}
            <Card>
              <CardHeader>
                <CardTitle>¿Te interesa este vehículo?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={handleWhatsAppContact}
                  className="w-full gradient-primary"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contactar por WhatsApp
                </Button>
                
                <Button 
                  onClick={handlePhoneCall}
                  variant="outline"
                  className="w-full"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Llamar Ahora
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;

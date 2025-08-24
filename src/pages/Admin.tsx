import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, Users, MessageSquare, Phone, Mail, MapPin, Clock, Plus, Edit, Trash2 } from 'lucide-react';
import VehicleForm from '@/components/admin/VehicleForm';
import TestimonialForm from '@/components/admin/TestimonialForm';
import VehicleStats from '@/components/admin/VehicleStats';

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
}

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

const Admin = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('motorsale_vehicles');
    return saved ? JSON.parse(saved) : [];
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('motorsale_testimonials');
    return saved ? JSON.parse(saved) : [];
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem('motorsale_contact');
    return saved ? JSON.parse(saved) : {
      phone: '+56934455147',
      email: 'contacto@motorsale.cl',
      address: 'Santiago, Chile',
      hours: 'Lun-Vie: 9:00-18:00, Sáb: 9:00-14:00'
    };
  });

  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleSaveVehicle = (vehicleData: Omit<Vehicle, 'id' | 'createdAt'>) => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: editingVehicle?.id || Date.now().toString(),
      createdAt: editingVehicle?.createdAt || new Date().toISOString(),
    };

    let updatedVehicles;
    if (editingVehicle) {
      updatedVehicles = vehicles.map(v => v.id === editingVehicle.id ? newVehicle : v);
    } else {
      updatedVehicles = [...vehicles, newVehicle];
    }

    setVehicles(updatedVehicles);
    localStorage.setItem('motorsale_vehicles', JSON.stringify(updatedVehicles));
    setEditingVehicle(null);
    setShowVehicleForm(false);
  };

  const handleDeleteVehicle = (id: string) => {
    const updatedVehicles = vehicles.filter(v => v.id !== id);
    setVehicles(updatedVehicles);
    localStorage.setItem('motorsale_vehicles', JSON.stringify(updatedVehicles));
  };

  const handleSaveTestimonial = (testimonialData: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...testimonialData,
      id: editingTestimonial?.id || Date.now().toString(),
    };

    let updatedTestimonials;
    if (editingTestimonial) {
      updatedTestimonials = testimonials.map(t => t.id === editingTestimonial.id ? newTestimonial : t);
    } else {
      updatedTestimonials = [...testimonials, newTestimonial];
    }

    setTestimonials(updatedTestimonials);
    localStorage.setItem('motorsale_testimonials', JSON.stringify(updatedTestimonials));
    setEditingTestimonial(null);
    setShowTestimonialForm(false);
  };

  const handleDeleteTestimonial = (id: string) => {
    const updatedTestimonials = testimonials.filter(t => t.id !== id);
    setTestimonials(updatedTestimonials);
    localStorage.setItem('motorsale_testimonials', JSON.stringify(updatedTestimonials));
  };

  const handleSaveContactInfo = (newContactInfo: ContactInfo) => {
    setContactInfo(newContactInfo);
    localStorage.setItem('motorsale_contact', JSON.stringify(newContactInfo));
    setShowContactForm(false);
  };

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
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Panel de Administración</h1>
          <p className="text-text-secondary">Gestiona tu inventario, testimonios e información de contacto</p>
        </div>

        <Tabs defaultValue="vehicles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vehicles">Vehículos</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonios</TabsTrigger>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Vehicles Tab */}
          <TabsContent value="vehicles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-text-primary">Gestión de Vehículos</h2>
              <Button 
                onClick={() => setShowVehicleForm(true)}
                className="gradient-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Vehículo
              </Button>
            </div>

            {showVehicleForm && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingVehicle ? 'Editar Vehículo' : 'Nuevo Vehículo'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <VehicleForm
                    vehicle={editingVehicle}
                    onSave={handleSaveVehicle}
                    onCancel={() => {
                      setShowVehicleForm(false);
                      setEditingVehicle(null);
                    }}
                  />
                </CardContent>
              </Card>
            )}

            <div className="grid gap-6">
              {vehicles.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Car className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-text-secondary text-center">
                      No hay vehículos registrados. Agrega tu primer vehículo para comenzar.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                vehicles.map((vehicle) => (
                  <Card key={vehicle.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-1/3">
                          <img
                            src={vehicle.image}
                            alt={`${vehicle.brand} ${vehicle.model}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        <div className="lg:w-2/3 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold text-text-primary">
                                {vehicle.brand} {vehicle.model} {vehicle.year}
                              </h3>
                              <p className="text-2xl font-bold text-primary">
                                {formatPrice(vehicle.price)}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant={vehicle.available ? "default" : "secondary"}>
                                {vehicle.available ? "Disponible" : "No Disponible"}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-text-secondary">Kilometraje:</span>
                              <p className="font-medium">{formatMileage(vehicle.mileage)}</p>
                            </div>
                            <div>
                              <span className="text-text-secondary">Combustible:</span>
                              <p className="font-medium">{vehicle.fuel}</p>
                            </div>
                            <div>
                              <span className="text-text-secondary">Transmisión:</span>
                              <p className="font-medium">{vehicle.transmission}</p>
                            </div>
                            <div>
                              <span className="text-text-secondary">Ubicación:</span>
                              <p className="font-medium">{vehicle.location}</p>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditingVehicle(vehicle);
                                setShowVehicleForm(true);
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteVehicle(vehicle.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-text-primary">Gestión de Testimonios</h2>
              <Button 
                onClick={() => setShowTestimonialForm(true)}
                className="gradient-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Testimonio
              </Button>
            </div>

            {showTestimonialForm && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingTestimonial ? 'Editar Testimonio' : 'Nuevo Testimonio'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <TestimonialForm
                    testimonial={editingTestimonial}
                    onSave={handleSaveTestimonial}
                    onCancel={() => {
                      setShowTestimonialForm(false);
                      setEditingTestimonial(null);
                    }}
                  />
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {testimonials.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-text-secondary text-center">
                      No hay testimonios registrados. Agrega el primer testimonio para comenzar.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                testimonials.map((testimonial) => (
                  <Card key={testimonial.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-text-primary">{testimonial.name}</h3>
                          <p className="text-sm text-text-secondary">{testimonial.location}</p>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${
                                  i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                            <span className="ml-2 text-sm text-text-secondary">
                              {testimonial.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingTestimonial(testimonial);
                              setShowTestimonialForm(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-text-secondary">{testimonial.comment}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>


          {/* Stats Tab */}
          <TabsContent value="stats">
            <VehicleStats vehicles={vehicles} testimonials={testimonials} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

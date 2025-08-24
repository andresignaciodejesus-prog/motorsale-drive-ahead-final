import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVehicles } from '@/hooks/useVehicles';
import { 
  Car, 
  Users, 
  MessageSquare, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Save,
  LogOut,
  BarChart3,
  DollarSign,
  Eye,
  Phone,
  Mail,
  MapPin,
  Clock
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

interface AdminProps {
  onLogout?: () => void;
}

const Admin: React.FC<AdminProps> = ({ onLogout }) => {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useVehicles();

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

  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  // Form states
  const [vehicleForm, setVehicleForm] = useState({
    brand: '', model: '', year: 2024, price: 0, mileage: 0,
    fuel: 'Gasolina', transmission: 'Manual', condition: 'Excelente', 
    bodyType: 'Sedán', location: '', mainImage: '', description: '', 
    features: [], status: 'available', isNew: false, isFeatured: false,
    engine: '', doors: 4, seats: 5, color: '', tags: []
  });
  
  const [testimonialForm, setTestimonialForm] = useState({
    name: '', location: '', rating: 5, comment: '', date: new Date().toISOString().split('T')[0]
  });
  
  const [contactForm, setContactForm] = useState(contactInfo);

  // Initialize forms when editing
  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setVehicleForm({
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price,
      mileage: vehicle.mileage,
      fuel: vehicle.fuel,
      transmission: vehicle.transmission,
      condition: vehicle.condition,
      bodyType: vehicle.bodyType,
      location: vehicle.location,
      mainImage: vehicle.mainImage,
      description: vehicle.description,
      features: vehicle.features,
      status: vehicle.status,
      isNew: vehicle.isNew,
      isFeatured: vehicle.isFeatured,
      engine: vehicle.engine,
      doors: vehicle.doors,
      seats: vehicle.seats,
      color: vehicle.color,
      tags: vehicle.tags
    });
    setShowVehicleForm(true);
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setTestimonialForm({
      name: testimonial.name,
      location: testimonial.location,
      rating: testimonial.rating,
      comment: testimonial.comment,
      date: testimonial.date
    });
    setShowTestimonialForm(true);
  };

  const handleEditContact = () => {
    setContactForm(contactInfo);
    setShowContactForm(true);
  };

  const handleSaveVehicle = async () => {
    try {
      const vehicleData = {
        ...vehicleForm,
        images: vehicleForm.mainImage ? [vehicleForm.mainImage] : [],
        dealerName: 'Motor Sale',
        dealerPhone: contactInfo.phone
      };

      if (editingVehicle) {
        await updateVehicle(editingVehicle.id, vehicleData);
      } else {
        await addVehicle(vehicleData);
      }

      setEditingVehicle(null);
      setShowVehicleForm(false);
      setVehicleForm({
        brand: '', model: '', year: 2024, price: 0, mileage: 0,
        fuel: 'Gasolina', transmission: 'Manual', condition: 'Excelente', 
        bodyType: 'Sedán', location: '', mainImage: '', description: '', 
        features: [], status: 'available', isNew: false, isFeatured: false,
        engine: '', doors: 4, seats: 5, color: '', tags: []
      });
    } catch (error) {
      console.error('Error saving vehicle:', error);
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    try {
      await deleteVehicle(id);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleSaveTestimonial = () => {
    const newTestimonial: Testimonial = {
      ...testimonialForm,
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
    setTestimonialForm({
      name: '', location: '', rating: 5, comment: '', date: new Date().toISOString().split('T')[0]
    });
  };

  const handleDeleteTestimonial = (id: string) => {
    const updatedTestimonials = testimonials.filter(t => t.id !== id);
    setTestimonials(updatedTestimonials);
    localStorage.setItem('motorsale_testimonials', JSON.stringify(updatedTestimonials));
  };

  const handleSaveContactInfo = () => {
    setContactInfo(contactForm);
    localStorage.setItem('motorsale_contact', JSON.stringify(contactForm));
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vehicles">Vehículos</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonios</TabsTrigger>
            <TabsTrigger value="contact">Contacto</TabsTrigger>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Vehicles Tab */}
          <TabsContent value="vehicles" className="space-y-6">
            <div className="flex justify-end mb-4">
              <Button onClick={onLogout} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
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
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="brand">Marca</Label>
                        <Input 
                          id="brand" 
                          value={vehicleForm.brand}
                          onChange={(e) => setVehicleForm({...vehicleForm, brand: e.target.value})}
                          placeholder="Toyota" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="model">Modelo</Label>
                        <Input 
                          id="model" 
                          value={vehicleForm.model}
                          onChange={(e) => setVehicleForm({...vehicleForm, model: e.target.value})}
                          placeholder="Corolla" 
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="year">Año</Label>
                        <Input 
                          id="year" 
                          type="number"
                          value={vehicleForm.year}
                          onChange={(e) => setVehicleForm({...vehicleForm, year: parseInt(e.target.value)})}
                          placeholder="2024" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Precio (CLP)</Label>
                        <Input 
                          id="price" 
                          type="number"
                          value={vehicleForm.price}
                          onChange={(e) => setVehicleForm({...vehicleForm, price: parseInt(e.target.value)})}
                          placeholder="15000000" 
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="mileage">Kilometraje</Label>
                        <Input 
                          id="mileage" 
                          type="number"
                          value={vehicleForm.mileage}
                          onChange={(e) => setVehicleForm({...vehicleForm, mileage: parseInt(e.target.value)})}
                          placeholder="50000" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="fuel">Combustible</Label>
                        <Select value={vehicleForm.fuel} onValueChange={(value) => setVehicleForm({...vehicleForm, fuel: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Gasolina">Gasolina</SelectItem>
                            <SelectItem value="Diesel">Diesel</SelectItem>
                            <SelectItem value="Híbrido">Híbrido</SelectItem>
                            <SelectItem value="Eléctrico">Eléctrico</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="transmission">Transmisión</Label>
                        <Select value={vehicleForm.transmission} onValueChange={(value) => setVehicleForm({...vehicleForm, transmission: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Manual">Manual</SelectItem>
                            <SelectItem value="Automática">Automática</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="condition">Estado</Label>
                        <Select value={vehicleForm.condition} onValueChange={(value) => setVehicleForm({...vehicleForm, condition: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Nuevo">Nuevo</SelectItem>
                            <SelectItem value="Usado">Usado</SelectItem>
                            <SelectItem value="Semi-nuevo">Semi-nuevo</SelectItem>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sedán">Sedán</SelectItem>
                            <SelectItem value="SUV">SUV</SelectItem>
                            <SelectItem value="Hatchback">Hatchback</SelectItem>
                            <SelectItem value="Pickup">Pickup</SelectItem>
                            <SelectItem value="Coupé">Coupé</SelectItem>
                            <SelectItem value="Convertible">Convertible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="location">Ubicación</Label>
                        <Input 
                          id="location" 
                          value={vehicleForm.location}
                          onChange={(e) => setVehicleForm({...vehicleForm, location: e.target.value})}
                          placeholder="Santiago, Chile" 
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="mainImage">URL de Imagen</Label>
                      <Input 
                        id="mainImage" 
                        value={vehicleForm.mainImage}
                        onChange={(e) => setVehicleForm({...vehicleForm, mainImage: e.target.value})}
                        placeholder="https://ejemplo.com/imagen.jpg" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea 
                        id="description" 
                        value={vehicleForm.description}
                        onChange={(e) => setVehicleForm({...vehicleForm, description: e.target.value})}
                        placeholder="Descripción del vehículo..." 
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => setShowVehicleForm(false)}>Cancelar</Button>
                      <Button onClick={handleSaveVehicle} className="gradient-primary">Guardar</Button>
                    </div>
                  </div>
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
                              onClick={() => handleEditVehicle(vehicle)}
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
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nombre</Label>
                        <Input 
                          id="name" 
                          value={testimonialForm.name}
                          onChange={(e) => setTestimonialForm({...testimonialForm, name: e.target.value})}
                          placeholder="Juan Pérez" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Ubicación</Label>
                        <Input 
                          id="location" 
                          value={testimonialForm.location}
                          onChange={(e) => setTestimonialForm({...testimonialForm, location: e.target.value})}
                          placeholder="Santiago, Chile" 
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="rating">Calificación</Label>
                        <Select value={testimonialForm.rating.toString()} onValueChange={(value) => setTestimonialForm({...testimonialForm, rating: parseInt(value)})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 Estrellas</SelectItem>
                            <SelectItem value="4">4 Estrellas</SelectItem>
                            <SelectItem value="3">3 Estrellas</SelectItem>
                            <SelectItem value="2">2 Estrellas</SelectItem>
                            <SelectItem value="1">1 Estrella</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="date">Fecha</Label>
                        <Input 
                          id="date" 
                          type="date"
                          value={testimonialForm.date}
                          onChange={(e) => setTestimonialForm({...testimonialForm, date: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="comment">Comentario</Label>
                      <Textarea 
                        id="comment" 
                        value={testimonialForm.comment}
                        onChange={(e) => setTestimonialForm({...testimonialForm, comment: e.target.value})}
                        placeholder="Excelente servicio..." 
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => setShowTestimonialForm(false)}>Cancelar</Button>
                      <Button onClick={handleSaveTestimonial} className="gradient-primary">Guardar</Button>
                    </div>
                  </div>
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

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-text-primary">Información de Contacto</h2>
              <Button 
                onClick={handleEditContact}
                className="gradient-primary"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar Información
              </Button>
            </div>

            {showContactForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Editar Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input 
                          id="phone" 
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Dirección</Label>
                      <Input 
                        id="address" 
                        value={contactForm.address}
                        onChange={(e) => setContactForm({...contactForm, address: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hours">Horarios</Label>
                      <Input 
                        id="hours" 
                        value={contactForm.hours}
                        onChange={(e) => setContactForm({...contactForm, hours: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => setShowContactForm(false)}>Cancelar</Button>
                      <Button onClick={handleSaveContactInfo} className="gradient-primary">Guardar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-text-secondary">Teléfono</p>
                      <p className="font-medium text-text-primary">{contactInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-text-secondary">Email</p>
                      <p className="font-medium text-text-primary">{contactInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-text-secondary">Dirección</p>
                      <p className="font-medium text-text-primary">{contactInfo.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-text-secondary">Horarios</p>
                      <p className="font-medium text-text-primary">{contactInfo.hours}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Car className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{vehicles.length}</p>
                      <p className="text-sm text-text-secondary">Vehículos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{testimonials.length}</p>
                      <p className="text-sm text-text-secondary">Testimonios</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{vehicles.filter(v => v.available).length}</p>
                      <p className="text-sm text-text-secondary">Disponibles</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

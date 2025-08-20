import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  Upload, 
  FileText, 
  Phone,
  Mail,
  Car,
  Calendar,
  Gauge,
  MapPin
} from 'lucide-react';

const Vender = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    marca: '',
    modelo: '',
    ano: '',
    kilometraje: '',
    comentarios: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['nombre', 'telefono', 'email', 'marca', 'modelo', 'ano'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Error en el formulario",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "¡Formulario enviado!",
      description: "Te contactaremos pronto para evaluar tu vehículo."
    });

    // Reset form
    setFormData({
      nombre: '',
      telefono: '',
      email: '',
      marca: '',
      modelo: '',
      ano: '',
      kilometraje: '',
      comentarios: ''
    });
  };

  const brands = [
    'Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 
    'Nissan', 'Hyundai', 'Kia', 'Mazda', 'Ford', 'Chevrolet', 'Otro'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i);

  const processSteps = [
    {
      icon: FileText,
      title: 'Completa el Formulario',
      description: 'Proporciona los detalles de tu vehículo'
    },
    {
      icon: Phone,
      title: 'Te Contactamos',
      description: 'Nuestro equipo se comunicará contigo en 24 horas'
    },
    {
      icon: Car,
      title: 'Evaluación Gratuita',
      description: 'Inspeccionamos tu auto sin costo'
    },
    {
      icon: CheckCircle,
      title: 'Venta Exitosa',
      description: 'Completamos la venta de forma segura'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Consignación Sin Riesgos',
      description: 'Tu auto está protegido durante todo el proceso'
    },
    {
      icon: Clock,
      title: 'Proceso Rápido',
      description: 'Vendemos tu auto en tiempo récord'
    },
    {
      icon: CheckCircle,
      title: '100% Transparente',
      description: 'Sin sorpresas, todo claro desde el inicio'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Vende tu Auto de Forma Segura
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Con Motor Sale, vender tu auto es fácil, rápido y seguro. 
            Nos encargamos de todo el proceso mientras tú te relajas.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover-lift">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Información de tu Vehículo</CardTitle>
                <CardDescription>
                  Completa el formulario y te contactaremos para hacer una evaluación gratuita
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-text-primary flex items-center">
                      <Mail className="h-5 w-5 mr-2" />
                      Información de Contacto
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nombre">Nombre Completo *</Label>
                        <Input
                          id="nombre"
                          value={formData.nombre}
                          onChange={(e) => handleInputChange('nombre', e.target.value)}
                          placeholder="Tu nombre completo"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefono">Teléfono *</Label>
                        <Input
                          id="telefono"
                          value={formData.telefono}
                          onChange={(e) => handleInputChange('telefono', e.target.value)}
                          placeholder="+56 9 3445 5147"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Vehicle Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-text-primary flex items-center">
                      <Car className="h-5 w-5 mr-2" />
                      Información del Vehículo
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="marca">Marca *</Label>
                        <Select value={formData.marca} onValueChange={(value) => handleInputChange('marca', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona la marca" />
                          </SelectTrigger>
                          <SelectContent>
                            {brands.map(brand => (
                              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="modelo">Modelo *</Label>
                        <Input
                          id="modelo"
                          value={formData.modelo}
                          onChange={(e) => handleInputChange('modelo', e.target.value)}
                          placeholder="Ej: Corolla, Civic, etc."
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ano">Año *</Label>
                        <Select value={formData.ano} onValueChange={(value) => handleInputChange('ano', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Año del vehículo" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map(year => (
                              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="kilometraje">Kilometraje</Label>
                        <Input
                          id="kilometraje"
                          value={formData.kilometraje}
                          onChange={(e) => handleInputChange('kilometraje', e.target.value)}
                          placeholder="Ej: 50000"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Comments */}
                  <div>
                    <Label htmlFor="comentarios">Comentarios Adicionales</Label>
                    <Textarea
                      id="comentarios"
                      value={formData.comentarios}
                      onChange={(e) => handleInputChange('comentarios', e.target.value)}
                      placeholder="Describe el estado del vehículo, accesorios adicionales, etc."
                      rows={4}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full gradient-primary hover:scale-105 transition-transform text-lg py-6"
                  >
                    Enviar Información
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Process Steps */}
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">¿Cómo Funciona?</h2>
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-text-secondary">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>¿Tienes preguntas?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+56 9 3445 5147</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>ventas@motorsale.cl</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Av. Buin 1234, Buin, Santiago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vender;
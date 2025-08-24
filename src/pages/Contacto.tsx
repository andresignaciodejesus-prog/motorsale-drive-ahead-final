import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useContactInfo } from '@/hooks/useContactInfo';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send,
  Navigation,
  Calendar
} from 'lucide-react';

const Contacto = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['nombre', 'email', 'mensaje'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Error en el formulario",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log('Enviando datos de contacto a Make.com:', formData);
      
      // Send data to Make.com webhook
      const response = await fetch('https://hook.us2.make.com/a8trpudax86qcme09mwpfg1krvavmf6w', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono || 'No especificado',
          asunto: formData.asunto || 'Consulta general',
          mensaje: formData.mensaje,
          tipo_formulario: 'Contacto',
          fecha: new Date().toISOString()
        })
      });

      console.log('Respuesta del webhook contacto:', response.status, response.statusText);

      if (response.ok) {
        toast({
          title: "¡Mensaje enviado exitosamente!",
          description: "Te responderemos en las próximas 24 horas."
        });

        // Reset form
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          asunto: '',
          mensaje: ''
        });
      } else {
        throw new Error('Error en el servidor');
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
      toast({
        title: "Error al enviar el mensaje",
        description: "Por favor intenta nuevamente o contáctanos directamente.",
        variant: "destructive"
      });
    }
  };

  const contactInfoDisplay = [
    {
      icon: MapPin,
      title: 'Dirección',
      details: [contact.address, contact.city],
      action: 'Ver en mapa'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      details: [contact.phone],
      action: 'Llamar ahora'
    },
    {
      icon: Mail,
      title: 'Email',
      details: [contact.email],
      action: 'Enviar email'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: [contact.whatsapp],
      action: 'Chatear en WhatsApp'
    }
  ];

  const businessHours = [
    { day: 'Lunes a Viernes', hours: '9:00 - 18:00' },
    { day: 'Sábados', hours: '9:00 - 14:00' },
    { day: 'Domingos', hours: 'Cerrado' }
  ];

  const handleWhatsAppClick = () => {
    const message = "Hola, me interesa conocer más sobre sus servicios de Motor Sale";
    const url = `${getWhatsAppLink()}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Contáctanos
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Estamos aquí para ayudarte. Ponte en contacto con nosotros y 
            te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Send className="h-6 w-6 mr-2 text-primary" />
                  Envíanos un Mensaje
                </CardTitle>
                <CardDescription>
                  Completa el formulario y te responderemos en las próximas 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        value={formData.telefono}
                        onChange={(e) => handleInputChange('telefono', e.target.value)}
                        placeholder="+56 9 3445 5147"
                      />
                    </div>
                    <div>
                      <Label htmlFor="asunto">Asunto</Label>
                      <Input
                        id="asunto"
                        value={formData.asunto}
                        onChange={(e) => handleInputChange('asunto', e.target.value)}
                        placeholder="¿En qué te podemos ayudar?"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="mensaje">Mensaje *</Label>
                    <Textarea
                      id="mensaje"
                      value={formData.mensaje}
                      onChange={(e) => handleInputChange('mensaje', e.target.value)}
                      placeholder="Escribe tu mensaje aquí..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-primary hover:scale-105 transition-transform text-lg py-6"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <Card>
              <CardContent className="p-6">
                {contactInfoDisplay.map((info, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">{info.title}</h3>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-text-secondary text-sm mb-1">
                        {detail}
                      </p>
                    ))}
                    <button 
                      className="text-primary hover:text-primary-hover text-sm font-medium mt-2"
                      onClick={() => {
                        if (info.title === 'WhatsApp') handleWhatsAppClick();
                        else if (info.title === 'Teléfono') window.open(`tel:${contact.phone}`);
                        else if (info.title === 'Email') window.open(`mailto:${contact.email}`);
                      }}
                    >
                      {info.action}
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Horarios de Atención
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-text-primary">{schedule.day}</span>
                    <span className="text-text-secondary font-medium">{schedule.hours}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-4">¿Necesitas ayuda inmediata?</h3>
                <div className="space-y-3">
                  <Button 
                    variant="secondary"
                    className="w-full"
                    onClick={handleWhatsAppClick}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-white text-white hover:bg-white hover:text-primary"
                    onClick={() => window.open(`tel:${contact.phone}`)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Llamar Ahora
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Navigation className="h-6 w-6 mr-2 text-primary" />
                Nuestra Ubicación
              </CardTitle>
              <CardDescription>
                Visítanos en nuestras oficinas en Buin, Santiago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 lg:h-96 bg-background-light rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Motor Sale - Buin, Santiago
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Av. Buin 1234, Buin, Santiago, Chile
                  </p>
                  <Button variant="outline">
                    Ver en Google Maps
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
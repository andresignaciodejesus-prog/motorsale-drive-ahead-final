import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Testimonios = () => {
  const testimonials = [
    {
      id: 1,
      name: 'María González',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      comment: 'Excelente servicio. Vendí mi auto de forma rápida y segura. El proceso fue totalmente transparente desde el primer día. El equipo de Motor Sale me mantuvo informada en cada paso y obtuve un precio justo por mi vehículo.',
      rating: 5,
      vehicle: 'Toyota RAV4 2019',
      service: 'Venta'
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      comment: 'Compré mi auto con Motor Sale y la experiencia fue increíble. Todo muy profesional, me ayudaron con la transferencia online y el vehículo llegó en perfectas condiciones. Definitivamente los recomiendo.',
      rating: 5,
      vehicle: 'BMW X3 2021',
      service: 'Compra'
    },
    {
      id: 3,
      name: 'Ana Rodríguez',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      comment: 'La consignación sin riesgos me dio mucha tranquilidad. Mi auto estuvo protegido durante todo el proceso y no tuve que preocuparme por nada. El precio final superó mis expectativas.',
      rating: 5,
      vehicle: 'Honda Civic 2020',
      service: 'Consignación'
    },
    {
      id: 4,
      name: 'Diego Pérez',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      comment: 'El servicio de inspección pre-compra fue fundamental. Me ayudó a tomar una decisión informada y evité problemas futuros. El reporte fue muy detallado y profesional.',
      rating: 5,
      vehicle: 'Mercedes C200 2019',
      service: 'Inspección'
    },
    {
      id: 5,
      name: 'Lucia Morales',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      comment: 'Motor Sale superó todas mis expectativas. El proceso de compra fue muy rápido y transparente. La transferencia online funcionó perfectamente y ahorro mucho tiempo.',
      rating: 5,
      vehicle: 'Hyundai Tucson 2021',
      service: 'Compra'
    },
    {
      id: 6,
      name: 'Roberto Silva',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      comment: 'Tuve una experiencia excelente vendiendo mi camioneta. El equipo fue muy profesional y me mantuvieron informado durante todo el proceso. Obtuve un precio justo y todo se resolvió rápidamente.',
      rating: 5,
      vehicle: 'Ford Ranger 2018',
      service: 'Venta'
    }
  ];

  const stats = [
    { number: '500+', label: 'Clientes Satisfechos' },
    { number: '98%', label: 'Tasa de Satisfacción' },
    { number: '4.9/5', label: 'Calificación Promedio' },
    { number: '15+', label: 'Años de Experiencia' }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Lo que Dicen Nuestros Clientes
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            La confianza de nuestros clientes es nuestro mayor logro. 
            Aquí algunas experiencias reales de quienes han trabajado con Motor Sale.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover-lift relative overflow-hidden">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Comment */}
                <p className="text-text-secondary mb-6 italic">
                  "{testimonial.comment}"
                </p>

                {/* Client Info */}
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {testimonial.vehicle}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {testimonial.service}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-background-light rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
            ¿Listo para Ser Nuestro Próximo Cliente Satisfecho?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Únete a los cientos de clientes que han confiado en Motor Sale 
            para comprar o vender su vehículo de forma segura y transparente.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/vender"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover transition-colors"
            >
              Vender mi Auto
            </a>
            <a
              href="/comprar"
              className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Comprar Auto
            </a>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-text-primary mb-8">
            Confían en Nosotros
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-text-secondary">4.9/5 en Google</span>
            </div>
            <div className="text-text-secondary">•</div>
            <div className="text-text-secondary">500+ Reseñas Verificadas</div>
            <div className="text-text-secondary">•</div>
            <div className="text-text-secondary">15 Años de Experiencia</div>
            <div className="text-text-secondary">•</div>
            <div className="text-text-secondary">Certificados y Licenciados</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonios;
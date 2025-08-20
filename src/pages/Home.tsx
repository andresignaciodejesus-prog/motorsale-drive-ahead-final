import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Hero from '@/components/Hero';
import VehicleCard from '@/components/VehicleCard';
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  Star, 
  Users, 
  Award,
  ArrowRight,
  Car,
  Handshake,
  FileCheck
} from 'lucide-react';
import imagenRecomendacion from '@/assets/imagen-recomendacion.jpg';

const Home = () => {
  // Mock data for featured vehicles
  const featuredVehicles = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=500&h=300&fit=crop',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2021,
      price: 18500000,
      mileage: 45000,
      fuel: 'Gasolina',
      location: 'Buin',
      isNew: false
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=300&fit=crop',
      brand: 'BMW',
      model: 'X3',
      year: 2022,
      price: 35000000,
      mileage: 25000,
      fuel: 'Gasolina',
      location: 'Santiago',
      isNew: true
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=500&h=300&fit=crop',
      brand: 'Honda',
      model: 'Civic',
      year: 2020,
      price: 16000000,
      mileage: 60000,
      fuel: 'Gasolina',
      location: 'Buin',
      isNew: false
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'María González',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      comment: 'Excelente servicio. Vendí mi auto de forma rápida y segura. El proceso fue totalmente transparente.',
      rating: 5
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      comment: 'Compré mi auto con Motor Sale y la experiencia fue increíble. Todo muy profesional.',
      rating: 5
    },
    {
      id: 3,
      name: 'Ana Rodríguez',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      comment: 'La consignación sin riesgos me dio mucha tranquilidad. Recomiendo 100% sus servicios.',
      rating: 5
    }
  ];

  const stats = [
    { number: '500+', label: 'Autos Vendidos', icon: Car },
    { number: '98%', label: 'Clientes Satisfechos', icon: Users },
    { number: '15+', label: 'Años de Experiencia', icon: Award },
    { number: '100%', label: 'Proceso Seguro', icon: Shield }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-text-primary mb-2">{stat.number}</div>
                <div className="text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Vehículos Destacados
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Descubre nuestra selección de vehículos de calidad, inspeccionados y listos para entregar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} {...vehicle} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="hover:scale-105 transition-transform">
              <NavLink to="/comprar">
                Ver Todos los Vehículos
                <ArrowRight className="ml-2 h-4 w-4" />
              </NavLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Sell Your Car Section */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
                ¿Quieres vender tu auto?
              </h2>
              <p className="text-text-secondary mb-8 text-lg">
                Con nuestro servicio de consignación segura, puedes vender tu vehículo 
                sin preocupaciones. Nos encargamos de todo el proceso mientras tú te relajas.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Handshake className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-text-primary">Consignación sin riesgos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileCheck className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-text-primary">Transferencia 100% online</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-text-primary">Proceso transparente y seguro</span>
                </div>
              </div>

              <Button asChild size="lg" className="gradient-primary hover:scale-105 transition-transform">
                <NavLink to="/vender">
                  Vender mi Auto
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NavLink>
              </Button>
            </div>

            <div className="relative">
              <img 
                src={imagenRecomendacion}
                alt="Cliente feliz con su nuevo auto - Motor Sale"
                className="rounded-xl shadow-2xl w-full h-80 object-cover object-left-center"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm">Proceso Seguro</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              La confianza de nuestros clientes es nuestro mayor logro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-card p-6 rounded-xl shadow-lg hover-lift">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-text-primary">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-text-secondary italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-background-dark to-background-dark/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            ¿Listo para tu próximo auto?
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Encuentra el vehículo perfecto para ti o vende el tuyo de forma segura con Motor Sale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gradient-primary hover:scale-105 transition-transform">
              <NavLink to="/comprar">Explorar Catálogo</NavLink>
            </Button>
            <Button 
              asChild 
              size="lg"
              className="gradient-primary hover:scale-105 transition-transform"
            >
              <NavLink to="/contacto">Contactar Ahora</NavLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Clock, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero-background.png';

const Hero = () => {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark/90 to-background-dark/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
        <div className="max-w-4xl mx-auto lg:mx-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Compra o vende tu auto de forma{' '}
            <span className="text-primary">segura y online</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0">
            En Motor Sale ofrecemos consignación sin riesgos, transferencia 100% online 
            y un proceso transparente para que tengas la mejor experiencia.
          </p>

          {/* Features */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-8">
            <div className="flex items-center space-x-2 text-white">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">Proceso Seguro</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm">Transferencia Rápida</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="text-sm">100% Transparente</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              asChild
              size="lg"
              className="gradient-primary hover:scale-105 transition-transform text-lg px-8"
            >
              <NavLink to="/comprar">Comprar Auto</NavLink>
            </Button>
            
            <Button 
              asChild
              size="lg"
              className="gradient-primary hover:scale-105 transition-transform text-lg px-8"
            >
              <NavLink to="/vender">Vender mi Auto</NavLink>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
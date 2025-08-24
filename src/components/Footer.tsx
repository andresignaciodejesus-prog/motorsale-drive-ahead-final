import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter,
  MessageCircle 
} from 'lucide-react';
import { useContactInfo } from '@/hooks/useContactInfo';
import motorSaleLogo from '@/assets/motor-sale-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { contactInfo, getWhatsAppLink } = useContactInfo();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src={motorSaleLogo} 
                alt="Motor Sale Logo" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-300 text-sm">
              Especialistas en compra y venta de vehículos en Buin, Santiago. 
              Proceso seguro, transparente y 100% online.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/comprar', label: 'Comprar Auto' },
                { to: '/vender', label: 'Vender Auto' },
                { to: '/testimonios', label: 'Testimonios' },
                { to: '/contacto', label: 'Contacto' },
              ].map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Av. Buin 1234, Buin<br />
                  Santiago, Chile
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href={getWhatsAppLink()}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href="mailto:info@motorsale.cl"
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  info@motorsale.cl
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Horarios</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p className="font-medium">Lunes a Viernes</p>
                  <p>9:00 - 18:00</p>
                </div>
              </div>
              <div className="text-gray-300 text-sm ml-8">
                <p className="font-medium">Sábados</p>
                <p>9:00 - 14:00</p>
              </div>
              <div className="text-gray-300 text-sm ml-8">
                <p className="font-medium">Domingos</p>
                <p>Cerrado</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Motor Sale. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <NavLink 
                to="/terminos-condiciones" 
                className="text-gray-400 hover:text-primary transition-colors text-sm"
              >
                Términos y Condiciones
              </NavLink>
              <NavLink 
                to="/politicas-privacidad" 
                className="text-gray-400 hover:text-primary transition-colors text-sm"
              >
                Política de Privacidad
              </NavLink>
              <NavLink 
                to="/admin" 
                className="text-gray-400 hover:text-primary transition-colors text-sm"
              >
                Admin
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
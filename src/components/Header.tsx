import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import motorSaleLogo from '@/assets/motor-sale-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/comprar', label: 'Comprar' },
    { to: '/vender', label: 'Vender' },
    { to: '/testimonios', label: 'Testimonios' },
    { to: '/contacto', label: 'Contacto' },
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <img 
              src={motorSaleLogo} 
              alt="Motor Sale Logo" 
              className="h-16 lg:h-20 w-auto"
            />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? 'text-primary' : 'text-text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+56934455147"
              className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm">+56 9 3445 5147</span>
            </a>
            <Button 
              asChild
              className="gradient-primary hover:scale-105 transition-transform"
            >
              <NavLink to="/vender">Vender mi Auto</NavLink>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-text-primary hover:text-primary hover:bg-muted transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border mt-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-base font-medium transition-colors ${
                    isActive ? 'text-primary' : 'text-text-primary hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-border space-y-3">
              <a
                href="tel:+56934455147"
                className="flex items-center space-x-2 text-text-secondary"
              >
                <Phone className="h-4 w-4" />
                <span>+56 9 3445 5147</span>
              </a>
              <Button 
                asChild
                className="w-full gradient-primary"
              >
                <NavLink to="/vender" onClick={() => setIsMenuOpen(false)}>
                  Vender mi Auto
                </NavLink>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useContactInfo } from '@/hooks/useContactInfo';

const WhatsAppFloat = () => {
  const { getWhatsAppLink } = useContactInfo();
  const message = "Hola, me interesa conocer más sobre sus servicios de Motor Sale";
  
  const handleWhatsAppClick = () => {
    const url = `${getWhatsAppLink()}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="whatsapp-float"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </button>
  );
};

export default WhatsAppFloat;
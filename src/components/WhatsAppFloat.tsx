import React from 'react';

const WhatsAppFloat = () => {
  const whatsappNumber = "+56977587288";
  const message = "Hola, me interesa conocer más sobre sus servicios de Motor Sale";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;
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
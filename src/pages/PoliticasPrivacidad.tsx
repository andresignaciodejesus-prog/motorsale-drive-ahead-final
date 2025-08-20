import React from 'react';
import { Shield, Lock, Eye, FileText, Phone, Mail } from 'lucide-react';

const PoliticasPrivacidad = () => {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Políticas de Privacidad
          </h1>
          <p className="text-xl text-text-secondary">
            Protegemos tu información personal con los más altos estándares de seguridad
          </p>
          <div className="text-sm text-text-secondary mt-4">
            Última actualización: {new Date().toLocaleDateString('es-CL')}
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-card p-8 rounded-xl shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <FileText className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-text-primary">1. Información que Recopilamos</h2>
            </div>
            <div className="space-y-4 text-text-secondary">
              <p>
                En Motor Sale, recopilamos información personal que nos proporcionas voluntariamente cuando:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Te registras en nuestro sitio web</li>
                <li>Solicitas información sobre vehículos</li>
                <li>Completas formularios de contacto</li>
                <li>Te suscribes a nuestro boletín informativo</li>
                <li>Utilizas nuestros servicios de compra o venta</li>
              </ul>
              <p>
                La información puede incluir: nombre, dirección de correo electrónico, número de teléfono, 
                dirección física, información sobre vehículos de interés, y cualquier otra información 
                que decidas compartir con nosotros.
              </p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <Lock className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-text-primary">2. Cómo Utilizamos tu Información</h2>
            </div>
            <div className="space-y-4 text-text-secondary">
              <p>Utilizamos la información recopilada para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Procesar y responder a tus consultas</li>
                <li>Proporcionarte información sobre vehículos disponibles</li>
                <li>Facilitar transacciones de compra y venta</li>
                <li>Enviarte actualizaciones sobre nuevos vehículos y ofertas especiales</li>
                <li>Mejorar nuestros servicios y experiencia del usuario</li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
                <li>Prevenir fraudes y actividades ilegales</li>
              </ul>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <Eye className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-text-primary">3. Compartir Información</h2>
            </div>
            <div className="space-y-4 text-text-secondary">
              <p>
                No vendemos, alquilamos ni compartimos tu información personal con terceros, 
                excepto en las siguientes circunstancias:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Con tu consentimiento explícito</li>
                <li>Para cumplir con obligaciones legales</li>
                <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio</li>
                <li>En caso de fusión, adquisición o venta de activos de la empresa</li>
                <li>Para proteger nuestros derechos, propiedad o seguridad</li>
              </ul>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-text-primary">4. Seguridad de la Información</h2>
            </div>
            <div className="space-y-4 text-text-secondary">
              <p>
                Implementamos medidas de seguridad técnicas, administrativas y físicas apropiadas 
                para proteger tu información personal contra acceso no autorizado, alteración, 
                divulgación o destrucción.
              </p>
              <p>
                Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico 
                es 100% seguro, por lo que no podemos garantizar seguridad absoluta.
              </p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <FileText className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-text-primary">5. Tus Derechos</h2>
            </div>
            <div className="space-y-4 text-text-secondary">
              <p>Tienes derecho a:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Acceder a tu información personal que tenemos</li>
                <li>Solicitar corrección de información inexacta</li>
                <li>Solicitar eliminación de tu información personal</li>
                <li>Oponerte al procesamiento de tu información</li>
                <li>Solicitar portabilidad de tus datos</li>
                <li>Retirar tu consentimiento en cualquier momento</li>
              </ul>
              <p>
                Para ejercer estos derechos, contáctanos usando la información proporcionada al final de esta política.
              </p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <Lock className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-text-primary">6. Cookies y Tecnologías Similares</h2>
            </div>
            <div className="space-y-4 text-text-secondary">
              <p>
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web, 
                analizar el tráfico y personalizar el contenido. Puedes controlar el uso de cookies a través 
                de la configuración de tu navegador.
              </p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <FileText className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-text-primary">7. Cambios a esta Política</h2>
            </div>
            <div className="space-y-4 text-text-secondary">
              <p>
                Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos 
                sobre cambios significativos publicando la nueva política en nuestro sitio web 
                y actualizando la fecha de "última actualización".
              </p>
            </div>
          </div>

          <div className="bg-primary/5 p-8 rounded-xl border border-primary/20">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Contacto</h2>
            <p className="text-text-secondary mb-6">
              Si tienes preguntas sobre esta política de privacidad o deseas ejercer tus derechos, 
              puedes contactarnos:
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-text-secondary">+56 9 3445 5147</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-text-secondary">contacto@motorsale.cl</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticasPrivacidad;

import React from 'react';
import { Scale, FileText, AlertTriangle, CheckCircle, Phone, Mail } from 'lucide-react';

const TerminosCondiciones = () => {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Scale className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-xl text-text-secondary">
            Condiciones de uso de nuestros servicios de compra y venta de vehículos
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
              <h2 className="text-2xl font-bold text-text-primary">1. Aceptación de los Términos</h2>
            </div>
            <div className="space-y-4 text-text-secondary">
              <p>
                Al acceder y utilizar el sitio web de Motor Sale, aceptas estar sujeto a estos 
                términos y condiciones de uso. Si no estás de acuerdo con alguno de estos términos, 
                no debes utilizar nuestros servicios.
              </p>
              <p>
                Estos términos se aplican a todos los visitantes, usuarios y otras personas que 
                acceden o utilizan nuestros servicios.
              </p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-text-primary">2. Descripción del Servicio</h2>
            </div>
            <div className="space-y-4 text-text-secondary">
              <p>Motor Sale es una plataforma que facilita:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>La compra y venta de vehículos usados y nuevos</li>
                <li>Servicios de intermediación entre compradores y vendedores</li>
                <li>Información y asesoramiento sobre vehículos</li>
                <li>Servicios de evaluación y tasación</li>
                <li>Gestión de documentación y trámites</li>
              </ul>
              <p>
                Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto 
                del servicio en cualquier momento.
              </p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <Scale className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-text-primary">3. Responsabilidades del Usuario</h2>
            </div>
            <div className="space-y-4 text-text-secondary">
              <p>Al utilizar nuestros servicios, te comprometes a:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Proporcionar información veraz y actualizada</li>
                <li>Mantener la confidencialidad de tu cuenta</li>
                <li>No utilizar el servicio para actividades ilegales</li>
                <li>Respetar los derechos de propiedad intelectual</li>
                <li>No interferir con el funcionamiento del sitio web</li>
                <li>Cumplir con todas las leyes y regulaciones aplicables</li>
              </ul>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <FileText className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-text-primary">4. Transacciones y Pagos</h2>
            </div>
            <div className="space-y-4 text-text-secondary">
              <p>
                Motor Sale actúa como intermediario en las transacciones. Las condiciones específicas 
                de cada venta se establecen entre el comprador y el vendedor.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Todos los precios están expresados en pesos chilenos (CLP)</li>
                <li>Los pagos deben realizarse a través de métodos seguros y verificables</li>
                <li>Motor Sale puede cobrar comisiones por sus servicios</li>
                <li>Las transacciones están sujetas a verificación y aprobación</li>
                <li>Los reembolsos se manejan caso por caso según las circunstancias</li>
              </ul>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-text-primary">5. Garantías y Condición de Vehículos</h2>
            </div>
            <div className="space-y-4 text-text-secondary">
              <p>
                Respecto a los vehículos ofrecidos en nuestra plataforma:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Realizamos inspecciones básicas de los vehículos</li>
                <li>Proporcionamos informes de condición disponibles</li>
                <li>Las garantías específicas son responsabilidad del vendedor</li>
                <li>Recomendamos inspección independiente antes de la compra</li>
                <li>Los vehículos se venden "tal como están" salvo garantía expresa</li>
              </ul>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-text-primary">6. Limitación de Responsabilidad</h2>
            </div>
            <div className="space-y-4 text-text-secondary">
              <p>
                Motor Sale no será responsable por:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Daños directos, indirectos, incidentales o consecuenciales</li>
                <li>Pérdidas de ganancias, datos o uso</li>
                <li>Interrupciones del servicio o errores técnicos</li>
                <li>Acciones u omisiones de terceros</li>
                <li>Defectos ocultos en los vehículos</li>
                <li>Disputas entre compradores y vendedores</li>
              </ul>
              <p>
                Nuestra responsabilidad total no excederá el monto de las comisiones pagadas por el servicio específico.
              </p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <Scale className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-text-primary">7. Propiedad Intelectual</h2>
            </div>
            <div className="space-y-4 text-text-secondary">
              <p>
                Todo el contenido del sitio web, incluyendo textos, gráficos, logos, imágenes, 
                software y otros materiales, es propiedad de Motor Sale o sus licenciantes y 
                está protegido por las leyes de propiedad intelectual.
              </p>
              <p>
                No puedes reproducir, distribuir, modificar o crear trabajos derivados sin 
                autorización expresa por escrito.
              </p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <FileText className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-text-primary">8. Terminación</h2>
            </div>
            <div className="space-y-4 text-text-secondary">
              <p>
                Podemos terminar o suspender tu acceso a nuestros servicios inmediatamente, 
                sin previo aviso, por cualquier motivo, incluyendo el incumplimiento de estos términos.
              </p>
              <p>
                Al terminar, tu derecho a usar el servicio cesará inmediatamente, pero las 
                disposiciones que por su naturaleza deben sobrevivir continuarán en vigor.
              </p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <Scale className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-text-primary">9. Ley Aplicable y Jurisdicción</h2>
            </div>
            <div className="space-y-4 text-text-secondary">
              <p>
                Estos términos se rigen por las leyes de Chile. Cualquier disputa relacionada 
                con estos términos será resuelta en los tribunales competentes de Santiago, Chile.
              </p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg mb-8">
            <div className="flex items-center mb-6">
              <FileText className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-text-primary">10. Modificaciones</h2>
            </div>
            <div className="space-y-4 text-text-secondary">
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.
              </p>
              <p>
                Tu uso continuado del servicio después de los cambios constituye aceptación 
                de los nuevos términos.
              </p>
            </div>
          </div>

          <div className="bg-primary/5 p-8 rounded-xl border border-primary/20">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Contacto</h2>
            <p className="text-text-secondary mb-6">
              Si tienes preguntas sobre estos términos y condiciones, puedes contactarnos:
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

export default TerminosCondiciones;

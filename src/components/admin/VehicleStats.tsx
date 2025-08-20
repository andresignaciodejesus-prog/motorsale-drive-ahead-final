import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, DollarSign, TrendingUp, Star, Package, ShoppingCart } from 'lucide-react';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  condition: string;
  type: string;
  location: string;
  image: string;
  description: string;
  features: string[];
  available: boolean;
  createdAt: string;
}

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

interface VehicleStatsProps {
  vehicles: Vehicle[];
  testimonials: Testimonial[];
}

const VehicleStats: React.FC<VehicleStatsProps> = ({ vehicles, testimonials }) => {
  // Calculate stats from vehicles data
  const stats = {
    total: vehicles.length,
    available: vehicles.filter(v => v.available).length,
    sold: vehicles.filter(v => !v.available).length,
    reserved: 0, // Not implemented yet
    maintenance: 0, // Not implemented yet
    totalValue: vehicles.filter(v => v.available).reduce((sum, v) => sum + v.price, 0),
    averagePrice: vehicles.filter(v => v.available).length > 0 
      ? vehicles.filter(v => v.available).reduce((sum, v) => sum + v.price, 0) / vehicles.filter(v => v.available).length 
      : 0,
    newVehicles: vehicles.filter(v => v.condition === 'Nuevo').length,
    usedVehicles: vehicles.filter(v => v.condition === 'Usado').length,
    featuredVehicles: vehicles.filter(v => v.features && v.features.length > 3).length,
  };
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-CL').format(num);
  };

  const getPercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const statsCards = [
    {
      title: 'Total Vehículos',
      value: formatNumber(stats.total),
      icon: Car,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Inventario completo',
    },
    {
      title: 'Disponibles',
      value: formatNumber(stats.available),
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: `${getPercentage(stats.available, stats.total)}% del inventario`,
    },
    {
      title: 'Vendidos',
      value: formatNumber(stats.sold),
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: `${getPercentage(stats.sold, stats.total)}% del inventario`,
    },
    {
      title: 'Valor Total',
      value: formatPrice(stats.totalValue),
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Inventario disponible',
    },
    {
      title: 'Precio Promedio',
      value: formatPrice(stats.averagePrice),
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Vehículos disponibles',
    },
    {
      title: 'Destacados',
      value: formatNumber(stats.featuredVehicles),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: `${getPercentage(stats.featuredVehicles, stats.total)}% del inventario`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Estado del Inventario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Disponibles</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{stats.available}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({getPercentage(stats.available, stats.total)}%)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Vendidos</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{stats.sold}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({getPercentage(stats.sold, stats.total)}%)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">Reservados</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{stats.reserved}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({getPercentage(stats.reserved, stats.total)}%)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">Mantenimiento</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{stats.maintenance}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({getPercentage(stats.maintenance, stats.total)}%)
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-green-500" 
                      style={{ width: `${getPercentage(stats.available, stats.total)}%` }}
                    ></div>
                    <div 
                      className="bg-blue-500" 
                      style={{ width: `${getPercentage(stats.sold, stats.total)}%` }}
                    ></div>
                    <div 
                      className="bg-yellow-500" 
                      style={{ width: `${getPercentage(stats.reserved, stats.total)}%` }}
                    ></div>
                    <div 
                      className="bg-red-500" 
                      style={{ width: `${getPercentage(stats.maintenance, stats.total)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Type Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Tipos de Vehículos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Nuevos</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{stats.newVehicles}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({getPercentage(stats.newVehicles, stats.total)}%)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span className="text-sm font-medium">Usados</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{stats.usedVehicles}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({getPercentage(stats.usedVehicles, stats.total)}%)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">Destacados</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{stats.featuredVehicles}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({getPercentage(stats.featuredVehicles, stats.total)}%)
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500" 
                      style={{ width: `${getPercentage(stats.newVehicles, stats.total)}%` }}
                    ></div>
                    <div 
                      className="bg-gray-500" 
                      style={{ width: `${getPercentage(stats.usedVehicles, stats.total)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {formatPrice(stats.averagePrice)}
                    </p>
                    <p className="text-xs text-gray-500">Precio Promedio</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">
                      {formatPrice(stats.totalValue)}
                    </p>
                    <p className="text-xs text-gray-500">Valor Total</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen Ejecutivo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Inventario Saludable
              </h3>
              <p className="text-sm text-green-600">
                {getPercentage(stats.available, stats.total)}% de vehículos disponibles para venta
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Rendimiento de Ventas
              </h3>
              <p className="text-sm text-blue-600">
                {stats.sold} vehículos vendidos del inventario total
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">
                Valor de Inventario
              </h3>
              <p className="text-sm text-purple-600">
                {formatPrice(stats.totalValue)} en inventario disponible
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleStats;

import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import VehicleCard from '@/components/VehicleCard';
import { useVehicles } from '@/hooks/useVehicles';

const Comprar = () => {
  const { vehicles, loading, searchVehicles, getBrands, getYears } = useVehicles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Get available vehicles only
  const availableVehicles = vehicles.filter(v => v.status === 'available');
  
  // Get unique brands and years from available vehicles
  const brands = getBrands();
  const years = getYears();

  // Filter vehicles based on criteria
  const filteredVehicles = useMemo(() => {
    let filtered = availableVehicles.filter(vehicle => {
      const matchesSearch = searchTerm === '' || 
        `${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBrand = selectedBrand === '' || vehicle.brand === selectedBrand;
      
      const matchesYear = selectedYear === '' || vehicle.year.toString() === selectedYear;
      
      const matchesPrice = priceRange === '' || (() => {
        switch (priceRange) {
          case 'under-15':
            return vehicle.price < 15000000;
          case '15-25':
            return vehicle.price >= 15000000 && vehicle.price <= 25000000;
          case '25-35':
            return vehicle.price >= 25000000 && vehicle.price <= 35000000;
          case 'over-35':
            return vehicle.price > 35000000;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesBrand && matchesYear && matchesPrice;
    });

    // Sort vehicles
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'year-new':
        return filtered.sort((a, b) => b.year - a.year);
      case 'year-old':
        return filtered.sort((a, b) => a.year - b.year);
      case 'mileage-low':
        return filtered.sort((a, b) => a.mileage - b.mileage);
      default:
        return filtered;
    }
  }, [availableVehicles, searchTerm, selectedBrand, selectedYear, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setSelectedYear('');
    setPriceRange('');
    setSortBy('newest');
  };

  const activeFiltersCount = [selectedBrand, selectedYear, priceRange].filter(f => f !== '').length;

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Cargando vehículos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Catálogo de Vehículos
          </h1>
          <p className="text-text-secondary">
            Encuentra el auto perfecto para ti. Todos nuestros vehículos están inspeccionados y listos para entregar.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card p-6 rounded-xl shadow-lg mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar por marca o modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <select 
              value={selectedBrand} 
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Todas las marcas</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Todos los años</option>
              {years.map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>

            <select 
              value={priceRange} 
              onChange={(e) => setPriceRange(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Todos los precios</option>
              <option value="under-15">Menos de $15M</option>
              <option value="15-25">$15M - $25M</option>
              <option value="25-35">$25M - $35M</option>
              <option value="over-35">Más de $35M</option>
            </select>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="newest">Más recientes</option>
              <option value="price-low">Precio: menor a mayor</option>
              <option value="price-high">Precio: mayor a menor</option>
              <option value="year-new">Año: más nuevo</option>
              <option value="year-old">Año: más antiguo</option>
              <option value="mileage-low">Menor kilometraje</option>
            </select>
          </div>

          {/* Active Filters & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Filter className="h-3 w-3" />
                    {activeFiltersCount} filtro{activeFiltersCount > 1 ? 's' : ''} activo{activeFiltersCount > 1 ? 's' : ''}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-primary hover:text-primary-hover"
                  >
                    Limpiar filtros
                  </Button>
                </>
              )}
            </div>
            <div className="text-text-secondary text-sm">
              {filteredVehicles.length} vehículos encontrados
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-16">
            <SlidersHorizontal className="h-16 w-16 text-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No se encontraron vehículos
            </h3>
            <p className="text-text-secondary mb-6">
              Intenta ajustar tus filtros de búsqueda para ver más resultados
            </p>
            <Button onClick={clearFilters} variant="outline">
              Limpiar todos los filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} {...vehicle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comprar;
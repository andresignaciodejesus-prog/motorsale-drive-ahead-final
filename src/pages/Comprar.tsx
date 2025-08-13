import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import VehicleCard from '@/components/VehicleCard';

const Comprar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Mock vehicles data
  const vehicles = [
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
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=300&fit=crop',
      brand: 'Mercedes',
      model: 'C200',
      year: 2019,
      price: 28000000,
      mileage: 80000,
      fuel: 'Gasolina',
      location: 'Santiago',
      isNew: false
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&h=300&fit=crop',
      brand: 'Hyundai',
      model: 'Tucson',
      year: 2021,
      price: 22000000,
      mileage: 35000,
      fuel: 'Gasolina',
      location: 'Buin',
      isNew: false
    },
    {
      id: '6',
      image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=500&h=300&fit=crop',
      brand: 'Audi',
      model: 'A4',
      year: 2020,
      price: 32000000,
      mileage: 50000,
      fuel: 'Gasolina',
      location: 'Santiago',
      isNew: false
    }
  ];

  // Get unique brands for filter
  const brands = [...new Set(vehicles.map(v => v.brand))].sort();
  const years = [...new Set(vehicles.map(v => v.year))].sort((a, b) => b - a);

  // Filter vehicles based on criteria
  const filteredVehicles = useMemo(() => {
    let filtered = vehicles.filter(vehicle => {
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
  }, [vehicles, searchTerm, selectedBrand, selectedYear, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setSelectedYear('');
    setPriceRange('');
    setSortBy('newest');
  };

  const activeFiltersCount = [selectedBrand, selectedYear, priceRange].filter(f => f !== '').length;

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
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger>
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas las marcas</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos los años</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Rango de precio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos los precios</SelectItem>
                <SelectItem value="under-15">Menos de $15M</SelectItem>
                <SelectItem value="15-25">$15M - $25M</SelectItem>
                <SelectItem value="25-35">$25M - $35M</SelectItem>
                <SelectItem value="over-35">Más de $35M</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Más recientes</SelectItem>
                <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                <SelectItem value="year-new">Año: más nuevo</SelectItem>
                <SelectItem value="year-old">Año: más antiguo</SelectItem>
                <SelectItem value="mileage-low">Menor kilometraje</SelectItem>
              </SelectContent>
            </Select>
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
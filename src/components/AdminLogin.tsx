import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Shield, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Credenciales por defecto (en producción deberías usar variables de entorno)
  const ADMIN_USERNAME = 'motorsale_admin';
  const ADMIN_PASSWORD = 'MotorSale2024!';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('motorsale_admin_auth', 'true');
      onLogin(true);
    } else {
      setError('Usuario o contraseña incorrectos');
      onLogin(false);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Panel de Administración</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder al panel de Motor Sale
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                type="text"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <p className="text-xs text-gray-600 mb-2">
              <strong>Credenciales por defecto:</strong>
            </p>
            <p className="text-xs text-gray-600">
              Usuario: <code className="bg-white px-1 rounded">motorsale_admin</code>
            </p>
            <p className="text-xs text-gray-600">
              Contraseña: <code className="bg-white px-1 rounded">MotorSale2024!</code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;

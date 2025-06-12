"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Heart,
  PawPrint,
  Plus,
  Users,
  Clock,
  Star,
  TrendingUp,
  Bell,
  Settings,
  MapPin,
  Phone,
  Mail,
  Award,
  Activity,
  Sparkles,
} from "lucide-react"
import { useState } from "react"

const users = [
  {
    id: "1",
    name: "María González",
    email: "maria@email.com",
    phone: "(555) 123-4567",
    address: "Calle Principal 123",
    role: "user",
    pets: ["pet1", "pet2"],
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2023-06-15",
    totalVisits: 12,
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    email: "carlos@email.com",
    phone: "(555) 987-6543",
    address: "Avenida Central 456",
    role: "user",
    pets: ["pet3"],
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2023-08-22",
    totalVisits: 8,
  },
]

const pets = [
  {
    id: "pet1",
    name: "Max",
    species: "perro" as const,
    breed: "Golden Retriever",
    age: 3,
    weight: 25.5,
    owner: "1",
    avatar: "/placeholder.svg?height=60&width=60",
    lastVisit: "2024-01-10",
    favoriteService: "Baño Premium",
  },
  {
    id: "pet2",
    name: "Luna",
    species: "gato" as const,
    breed: "Siamés",
    age: 2,
    weight: 4.2,
    owner: "1",
    avatar: "/placeholder.svg?height=60&width=60",
    lastVisit: "2024-01-08",
    favoriteService: "Masaje Relajante",
  },
  {
    id: "pet3",
    name: "Rocky",
    species: "perro" as const,
    breed: "Bulldog",
    age: 5,
    weight: 18.0,
    owner: "2",
    avatar: "/placeholder.svg?height=60&width=60",
    lastVisit: "2024-01-12",
    favoriteService: "Corte Estilizado",
  },
]

const appointments = [
  {
    id: "1",
    petName: "Max",
    petAvatar: "/placeholder.svg?height=40&width=40",
    service: "Baño y Corte Premium",
    date: "2024-01-15",
    time: "10:00",
    status: "confirmada",
    duration: "2h",
    price: "$85",
  },
  {
    id: "2",
    petName: "Luna",
    petAvatar: "/placeholder.svg?height=40&width=40",
    service: "Masaje Relajante",
    date: "2024-01-16",
    time: "14:30",
    status: "pendiente",
    duration: "1h",
    price: "$65",
  },
  {
    id: "3",
    petName: "Rocky",
    petAvatar: "/placeholder.svg?height=40&width=40",
    service: "Limpieza Dental",
    date: "2024-01-17",
    time: "11:00",
    status: "confirmada",
    duration: "1.5h",
    price: "$95",
  },
]

const recentActivity = [
  { id: 1, action: "Nueva cita programada", pet: "Max", time: "Hace 2 horas", icon: Calendar },
  { id: 2, action: "Servicio completado", pet: "Luna", time: "Hace 1 día", icon: Star },
  { id: 3, action: "Nuevo cliente registrado", pet: "Rocky", time: "Hace 2 días", icon: Users },
  { id: 4, action: "Pago procesado", pet: "Max", time: "Hace 3 días", icon: Award },
]

export default function DashboardPage() {
  const [newPet, setNewPet] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    weight: "",
  })

  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New pet:", newPet)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                ¡Bienvenido de vuelta!
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 ml-2">
                  María
                </span>
              </h1>
              <p className="text-xl text-gray-600">Gestiona tu cuenta, mascotas y citas desde aquí</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                <Bell className="w-4 h-4 mr-2" />
                Notificaciones
              </Button>
              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Usuarios</CardTitle>
              <Users className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{users.length}</div>
              <div className="flex items-center mt-2 text-sm opacity-80">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% este mes
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Mascotas Felices</CardTitle>
              <PawPrint className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pets.length}</div>
              <div className="flex items-center mt-2 text-sm opacity-80">
                <Heart className="w-4 h-4 mr-1" />
                100% satisfacción
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Citas Programadas</CardTitle>
              <Calendar className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{appointments.length}</div>
              <div className="flex items-center mt-2 text-sm opacity-80">
                <Clock className="w-4 h-4 mr-1" />
                Próximas 7 días
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Servicios Premium</CardTitle>
              <Sparkles className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">6</div>
              <div className="flex items-center mt-2 text-sm opacity-80">
                <Star className="w-4 h-4 mr-1" />
                Disponibles
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Mis Mascotas */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-gray-900 flex items-center">
                      <PawPrint className="w-6 h-6 mr-2 text-amber-500" />
                      Mis Mascotas
                    </CardTitle>
                    <CardDescription className="text-base">
                      Gestiona la información de tus compañeros peludos
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg">
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar Mascota
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Agregar Nueva Mascota</DialogTitle>
                        <DialogDescription>Completa la información de tu nueva mascota</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddPet} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="petName">Nombre</Label>
                          <Input
                            id="petName"
                            value={newPet.name}
                            onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                            className="border-amber-200 focus:border-amber-400"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="species">Especie</Label>
                          <Select
                            value={newPet.species}
                            onValueChange={(value) => setNewPet({ ...newPet, species: value })}
                          >
                            <SelectTrigger className="border-amber-200 focus:border-amber-400">
                              <SelectValue placeholder="Selecciona la especie" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="perro">🐕 Perro</SelectItem>
                              <SelectItem value="gato">🐱 Gato</SelectItem>
                              <SelectItem value="otro">🐾 Otro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="breed">Raza</Label>
                          <Input
                            id="breed"
                            value={newPet.breed}
                            onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                            className="border-amber-200 focus:border-amber-400"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="age">Edad (años)</Label>
                            <Input
                              id="age"
                              type="number"
                              value={newPet.age}
                              onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                              className="border-amber-200 focus:border-amber-400"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="weight">Peso (kg)</Label>
                            <Input
                              id="weight"
                              type="number"
                              step="0.1"
                              value={newPet.weight}
                              onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
                              className="border-amber-200 focus:border-amber-400"
                              required
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Agregar Mascota
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {pets.map((pet) => (
                    <div
                      key={pet.id}
                      className="flex items-center justify-between p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16 border-2 border-amber-300">
                          <AvatarImage src={pet.avatar || "/placeholder.svg"} alt={pet.name} />
                          <AvatarFallback className="bg-amber-200 text-amber-800 text-lg font-bold">
                            {pet.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
                          <p className="text-gray-600">
                            {pet.breed} • {pet.age} años • {pet.weight} kg
                          </p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            Última visita: {pet.lastVisit}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800 mb-2">
                          {pet.species === "perro" ? "🐕" : "🐱"}{" "}
                          {pet.species.charAt(0).toUpperCase() + pet.species.slice(1)}
                        </Badge>
                        <p className="text-sm text-gray-500">Favorito: {pet.favoriteService}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actividad Reciente */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-amber-500" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <activity.icon className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.pet}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Próximas Citas */}
        <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-amber-500" />
              Próximas Citas
            </CardTitle>
            <CardDescription className="text-base">Tus citas programadas para los próximos días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-6 bg-gradient-to-br from-white to-amber-50 rounded-xl border border-amber-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12 border-2 border-amber-300">
                        <AvatarImage src={appointment.petAvatar || "/placeholder.svg"} alt={appointment.petName} />
                        <AvatarFallback className="bg-amber-200 text-amber-800 font-bold">
                          {appointment.petName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-gray-900">{appointment.petName}</h3>
                        <p className="text-sm text-gray-600">{appointment.service}</p>
                      </div>
                    </div>
                    <Badge
                      variant={appointment.status === "confirmada" ? "default" : "secondary"}
                      className={
                        appointment.status === "confirmada"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-amber-500" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-amber-500" />
                      {appointment.time} ({appointment.duration})
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-amber-200">
                      <span className="font-semibold text-amber-600">{appointment.price}</span>
                      <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Usuarios */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900 flex items-center">
              <Users className="w-6 h-6 mr-2 text-amber-500" />
              Comunidad PetSpa
            </CardTitle>
            <CardDescription className="text-base">Nuestros clientes y sus mascotas felices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Mascotas</TableHead>
                    <TableHead>Visitas</TableHead>
                    <TableHead>Miembro desde</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="hover:bg-amber-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback className="bg-amber-200 text-amber-800">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="w-3 h-3 mr-1" />
                              {user.address}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="w-3 h-3 mr-2 text-gray-400" />
                            {user.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="w-3 h-3 mr-2 text-gray-400" />
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                          {user.pets.length} mascota{user.pets.length !== 1 ? "s" : ""}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Award className="w-4 h-4 mr-1 text-amber-500" />
                          {user.totalVisits}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{user.joinDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.role === "admin" ? "default" : "secondary"}
                          className={
                            user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"
                          }
                        >
                          {user.role === "admin" ? "Administrador" : "Cliente VIP"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

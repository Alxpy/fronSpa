
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
import { Calendar, Heart, PawPrint, Plus, Users } from "lucide-react"
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
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    email: "carlos@email.com",
    phone: "(555) 987-6543",
    address: "Avenida Central 456",
    role: "user",
    pets: ["pet3"],
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
  },
  {
    id: "pet2",
    name: "Luna",
    species: "gato" as const,
    breed: "Siamés",
    age: 2,
    weight: 4.2,
    owner: "1",
  },
  {
    id: "pet3",
    name: "Rocky",
    species: "perro" as const,
    breed: "Bulldog",
    age: 5,
    weight: 18.0,
    owner: "2",
  },
]

const appointments = [
  {
    id: "1",
    petName: "Max",
    service: "Baño y Corte Premium",
    date: "2024-01-15",
    time: "10:00",
    status: "confirmada",
  },
  {
    id: "2",
    petName: "Luna",
    service: "Masaje Relajante",
    date: "2024-01-16",
    time: "14:30",
    status: "pendiente",
  },
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
    // Aquí iría la lógica para agregar la mascota
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Dashboard</h1>
          <p className="text-xl text-gray-600">Gestiona tu cuenta, mascotas y citas</p>
        </div>

        {/* Estadísticas */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{users.length}</div>
            </CardContent>
          </Card>

          <Card className="border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mascotas Registradas</CardTitle>
              <PawPrint className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{pets.length}</div>
            </CardContent>
          </Card>

          <Card className="border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas Programadas</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{appointments.length}</div>
            </CardContent>
          </Card>

          <Card className="border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Servicios Activos</CardTitle>
              <Heart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">6</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mis Mascotas */}
          <Card className="border-blue-100">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-blue-900">Mis Mascotas</CardTitle>
                  <CardDescription>Gestiona la información de tus mascotas</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Agregar Nueva Mascota</DialogTitle>
                      <DialogDescription>Completa la información de tu mascota</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddPet} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="petName">Nombre</Label>
                        <Input
                          id="petName"
                          value={newPet.name}
                          onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="species">Especie</Label>
                        <Select
                          value={newPet.species}
                          onValueChange={(value) => setNewPet({ ...newPet, species: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona la especie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="perro">Perro</SelectItem>
                            <SelectItem value="gato">Gato</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="breed">Raza</Label>
                        <Input
                          id="breed"
                          value={newPet.breed}
                          onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
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
                            required
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Agregar Mascota
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pets.map((pet) => (
                  <div key={pet.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-blue-900">{pet.name}</h3>
                      <p className="text-sm text-gray-600">
                        {pet.breed} • {pet.age} años • {pet.weight} kg
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {pet.species.charAt(0).toUpperCase() + pet.species.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Próximas Citas */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-900">Próximas Citas</CardTitle>
              <CardDescription>Tus citas programadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-blue-900">{appointment.petName}</h3>
                      <p className="text-sm text-gray-600">{appointment.service}</p>
                      <p className="text-sm text-gray-500">
                        {appointment.date} a las {appointment.time}
                      </p>
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
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de Usuarios (Solo para admin) */}
        <Card className="mt-8 border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Usuarios Registrados</CardTitle>
            <CardDescription>Lista de todos los usuarios del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Mascotas</TableHead>
                  <TableHead>Rol</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {user.pets.length} mascota{user.pets.length !== 1 ? "s" : ""}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

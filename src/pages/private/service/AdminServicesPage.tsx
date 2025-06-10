import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Clock, Edit, Heart, MoreHorizontal, Plus, Scissors, Search, Shield, Sparkles, Trash2 } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useDeleteService, useGetServices } from "@/hook/services"

const categoryIcons = {
  belleza: Scissors,
  relajacion: Heart,
  salud: Shield,
  otro: Sparkles,
}

const categoryColors = {
  belleza: "bg-pink-100 text-pink-800",
  relajacion: "bg-green-100 text-green-800",
  salud: "bg-blue-100 text-blue-800",
  otro: "bg-purple-100 text-purple-800",
}

function AdminServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { data: services, isLoading } = useGetServices()
  const { mutate: deleteService } = useDeleteService()

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Cargando servicios...</div>
  }

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-blue-100 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Servicios</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Gestión de Servicios</h1>
            <p className="text-blue-600">Administra los servicios de spa disponibles</p>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/admin/services/new">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Servicio
            </Link>
          </Button>
        </div>

        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Lista de Servicios</CardTitle>
            <CardDescription>Gestiona todos los servicios disponibles en tu spa</CardDescription>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar servicios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-blue-200 focus:border-blue-500"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => {
                  const IconComponent = categoryIcons[service.category as keyof typeof categoryIcons]
                  return (
                    <TableRow key={service._id} className="hover:bg-blue-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <IconComponent className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-blue-900">{service.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{service.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={categoryColors[service.category as keyof typeof categoryColors]}
                        >
                          {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">${service.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{service.duration} min</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={service.isActive ? "default" : "secondary"}
                          className={service.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                        >
                          {service.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/services/${service._id}/edit`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteService(service._id)}
                              className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}

export default AdminServicesPage
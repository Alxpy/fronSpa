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
import { Edit, Mail, MapPin, MoreHorizontal, Phone, Plus, Search, Trash2, Truck } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useDeleteSupplier, useGetSuppliers } from "@/hook/supplier"

export default function AdminSupplierPage() {

  const { data: suppliers, isLoading } = useGetSuppliers()
  const { mutate: deleteSupplier } = useDeleteSupplier()
  const [searchTerm, setSearchTerm] = useState("")

  if (isLoading) {
    return (
      <SidebarInset>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Cargando proveedores...</p>
        </div>
      </SidebarInset>
    )
  }

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()),
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
              <BreadcrumbPage>Proveedores</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Gestión de Proveedores</h1>
            <p className="text-blue-600">Administra tu red de proveedores y distribuidores</p>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/admin/suppliers/new">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Proveedor
            </Link>
          </Button>
        </div>

        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Lista de Proveedores</CardTitle>
            <CardDescription>Gestiona todos los proveedores registrados en el sistema</CardDescription>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar proveedores..."
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
                  <TableHead>Proveedor</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>Fecha Registro</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier._id} className="hover:bg-blue-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Truck className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-blue-900">{supplier.name}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">{supplier.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-blue-600">{supplier.email}</span>
                        </div>
                        {supplier.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{supplier.phone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="max-w-xs truncate">{supplier.address}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(supplier.createdAt).toLocaleDateString("es-ES")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          "bg-gray-100 text-gray-800"
                        }
                      >
                        Hola
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
                            <Link to={`/admin/suppliers/${supplier._id}/edit`}>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Enviar Email
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteSupplier(supplier._id)}
                            className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredSuppliers.length === 0 && (
              <div className="text-center py-12">
                <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-500 mb-2">No se encontraron proveedores</p>
                <p className="text-gray-400 mb-4">
                  {searchTerm ? "Intenta con otros términos de búsqueda" : "Comienza agregando tu primer proveedor"}
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link to="/admin/suppliers/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Proveedor
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}

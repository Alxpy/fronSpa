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
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

// Datos de ejemplo
const products = [
  {
    id: "1",
    name: "Alimento Premium para Perros",
    description: "Alimento balanceado de alta calidad para perros adultos",
    price: 45.99,
    category: "Alimentación",
    stock: 25,
    sku: "ALM-001",
    status: "active",
  },
  {
    id: "2",
    name: "Juguete Interactivo",
    description: "Juguete que estimula la mente de tu mascota",
    price: 19.99,
    category: "Juguetes",
    stock: 15,
    sku: "JUG-002",
    status: "active",
  },
  {
    id: "3",
    name: "Collar Antipulgas",
    description: "Collar efectivo contra pulgas y garrapatas",
    price: 12.99,
    category: "Accesorios",
    stock: 0,
    sku: "ACC-003",
    status: "inactive",
  },
  {
    id: "4",
    name: "Shampoo Hipoalergénico",
    description: "Shampoo especial para pieles sensibles",
    price: 24.99,
    category: "Cuidado",
    stock: 20,
    sku: "CUI-004",
    status: "active",
  },
]

function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
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
              <BreadcrumbPage>Productos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Gestión de Productos</h1>
            <p className="text-blue-600">Administra el inventario de productos</p>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/admin/products/new">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Link>
          </Button>
        </div>

        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Lista de Productos</CardTitle>
            <CardDescription>Gestiona todos los productos disponibles en tu tienda</CardDescription>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar productos..."
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
                  <TableHead>SKU</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-blue-50">
                    <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-blue-900">{product.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">${product.price}</TableCell>
                    <TableCell>
                      <Badge
                        variant={product.stock > 10 ? "default" : product.stock > 0 ? "secondary" : "destructive"}
                        className={
                          product.stock > 10
                            ? "bg-green-100 text-green-800"
                            : product.stock > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {product.stock} unidades
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={product.status === "active" ? "default" : "secondary"}
                        className={
                          product.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {product.status === "active" ? "Activo" : "Inactivo"}
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
                            <Link to={`/admin/products/${product.id}/edit`}>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
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
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}

export default AdminProductsPage
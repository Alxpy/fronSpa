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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Edit,
  Mail,
  MoreHorizontal,
  PawPrint,
  Phone,
  Search,
  Shield,
  ShieldCheck,
  Trash2,
  User,
  UserCheck,
  Users,
} from "lucide-react"
import { useState } from "react"
import { useDeleteUser, useGetUsers } from "@/hook/users"

export default function AdminUsersPage() {

  const { data: users, isLoading } = useGetUsers()
  const { mutate: deleteUser } = useDeleteUser()

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Cargando usuarios...</div>
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null)
  const [editFormData, setEditFormData] = useState({
    email: "",
    phone: "",
    address: "",
    document: "",
    role: "user" as "user" | "admin",
  })

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.document.includes(searchTerm) ||
      user.phone.includes(searchTerm),
  )

  const totalUsers = users.length
  const adminUsers = users.filter((u) => u.role === "admin").length
  const regularUsers = users.filter((u) => u.role === "user").length
  const usersWithPets = users.filter((u) => u.pets.length > 0).length


  const handleSaveEdit = () => {
    console.log("Saving user:", { ...selectedUser, ...editFormData })
    // Aquí iría la lógica para actualizar el usuario
    setSelectedUser(null)
  }

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId)
  }

  const handleChangeRole = (userId: string, newRole: "user" | "admin") => {
    console.log("Changing role:", { userId, newRole })
    // Aquí iría la lógica para cambiar el rol
  }

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
              <BreadcrumbPage>Usuarios</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Gestión de Usuarios</h1>
            <p className="text-blue-600">Administra los usuarios registrados en la plataforma</p>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-900">{totalUsers}</div>
                  <p className="text-sm text-gray-600">Total Usuarios</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{regularUsers}</div>
              <p className="text-sm text-gray-600">Usuarios Regulares</p>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">{adminUsers}</div>
              <p className="text-sm text-gray-600">Administradores</p>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">{usersWithPets}</div>
              <p className="text-sm text-gray-600">Con Mascotas</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Lista de Usuarios</CardTitle>
            <CardDescription>Gestiona todos los usuarios registrados en el sistema</CardDescription>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por email, documento o teléfono..."
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
                  <TableHead>Usuario</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Mascotas</TableHead>
                  <TableHead>Último Acceso</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user._id} className="hover:bg-blue-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {user.role === "admin" ? (
                            <ShieldCheck className="w-5 h-5 text-blue-600" />
                          ) : (
                            <User className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-blue-900">{user.email}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">{user.address}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-blue-600">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{user.document}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Badge
                              variant={user.role === "admin" ? "default" : "secondary"}
                              className={
                                user.role === "admin"
                                  ? "bg-purple-100 text-purple-800 cursor-pointer"
                                  : "bg-green-100 text-green-800 cursor-pointer"
                              }
                            >
                              {user.role === "admin" ? (
                                <>
                                  <Shield className="w-3 h-3 mr-1" />
                                  Admin
                                </>
                              ) : (
                                <>
                                  <UserCheck className="w-3 h-3 mr-1" />
                                  Usuario
                                </>
                              )}
                            </Badge>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleChangeRole(user._id, "user")}>
                            <UserCheck className="w-4 h-4 mr-2" />
                            Cambiar a Usuario
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleChangeRole(user._id, "admin")}>
                            <Shield className="w-4 h-4 mr-2" />
                            Cambiar a Admin
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <PawPrint className="w-4 h-4 text-gray-400" />
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                          {user.pets.length} mascota{user.pets.length !== 1 ? "s" : ""}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date().toLocaleDateString("es-ES")}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Edit className="w-4 h-4 mr-2" />
                                Editar Usuario
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Editar Usuario</DialogTitle>
                                <DialogDescription>Modifica la información del usuario</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-email">Email</Label>
                                  <Input
                                    id="edit-email"
                                    value={editFormData.email}
                                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-phone">Teléfono</Label>
                                  <Input
                                    id="edit-phone"
                                    value={editFormData.phone}
                                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-address">Dirección</Label>
                                  <Input
                                    id="edit-address"
                                    value={editFormData.address}
                                    onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-document">Documento</Label>
                                  <Input
                                    id="edit-document"
                                    value={editFormData.document}
                                    onChange={(e) => setEditFormData({ ...editFormData, document: e.target.value })}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-role">Rol</Label>
                                  <Select
                                    value={editFormData.role}
                                    onValueChange={(value: "user" | "admin") =>
                                      setEditFormData({ ...editFormData, role: value })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="user">Usuario</SelectItem>
                                      <SelectItem value="admin">Administrador</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="button" variant="outline">
                                  Cancelar
                                </Button>
                                <Button
                                  type="button"
                                  onClick={handleSaveEdit}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  Guardar Cambios
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Eliminar Usuario
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Se eliminará permanentemente el usuario y todos sus
                                  datos asociados.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteUser(user._id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-500 mb-2">No se encontraron usuarios</p>
                <p className="text-gray-400">
                  {searchTerm ? "Intenta con otros términos de búsqueda" : "No hay usuarios registrados"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}

"use client"

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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Calendar,
  Clock,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Trash2,
  User,
  CheckCircle,
  XCircle,
  CalendarClock,
} from "lucide-react"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useGetAppointments } from "@/hook/appointment"

// Datos de ejemplo


const services = [
  { id: "serv1", name: "Baño y Corte Premium", price: 45.0, duration: 90 },
  { id: "serv2", name: "Masaje Relajante", price: 35.0, duration: 60 },
  { id: "serv3", name: "Limpieza Dental", price: 55.0, duration: 45 },
  { id: "serv4", name: "Tratamiento de Uñas", price: 20.0, duration: 30 },
]

const pets = [
  { id: "pet1", name: "Max", species: "perro", owner: "María González" },
  { id: "pet2", name: "Luna", species: "gato", owner: "María González" },
  { id: "pet3", name: "Rocky", species: "perro", owner: "Carlos Rodríguez" },
  { id: "pet4", name: "Bella", species: "gato", owner: "Ana Martínez" },
  { id: "pet5", name: "Toby", species: "perro", owner: "Luis Fernández" },
  { id: "pet6", name: "Mimi", species: "gato", owner: "Ana Martínez" },
]

// Esquema de validación
const appointmentValidationSchema = Yup.object({
  date: Yup.string().required("La fecha es requerida"),
  time: Yup.string().required("La hora es requerida"),
  service: Yup.string().required("El servicio es requerido"),
  pets: Yup.array().min(1, "Debe seleccionar al menos una mascota"),
  notes: Yup.string().max(500, "Las notas no pueden exceder 500 caracteres"),
})

export default function AppointmentsPage() {

  const { data: appointments, isLoading } = useGetAppointments()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAppointment, setSelectedAppointment] = useState<(typeof appointments)[0] | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Cargando citas...</div>
  }

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.pet.some((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const totalAppointments = appointments.length
  const scheduledCount = appointments.filter((a) => a.status === "scheduled").length
  const completedCount = appointments.filter((a) => a.status === "completed").length
  const canceledCount = appointments.filter((a) => a.status === "canceled").length

  // Formik para agregar cita
  const addFormik = useFormik({
    initialValues: {
      date: "",
      time: "",
      service: "",
      pets: [] as string[],
      notes: "",
    },
    validationSchema: appointmentValidationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Adding appointment:", values)
      resetForm()
      setIsAddModalOpen(false)
    },
  })

  // Formik para editar cita
  const editFormik = useFormik({
    initialValues: {
      date: selectedAppointment?.date || "",
      time: selectedAppointment?.time || "",
      service: selectedAppointment?.service._id || "",
      pets: selectedAppointment?.pet.map((p) => p._id) || [],
      notes: selectedAppointment?.notes || "",
    },
    enableReinitialize: true,
    validationSchema: appointmentValidationSchema,
    onSubmit: (values) => {
      console.log("Editing appointment:", { ...selectedAppointment, ...values })
      setIsEditModalOpen(false)
      setSelectedAppointment(null)
    },
  })

  const handleEditAppointment = (appointment: (typeof appointments)[0]) => {
    setSelectedAppointment(appointment)
    setIsEditModalOpen(true)
  }

  const handleDeleteAppointment = (appointmentId: string) => {
    console.log("Deleting appointment:", appointmentId)
  }

  const handleChangeStatus = (appointmentId: string, newStatus: "scheduled" | "completed" | "canceled") => {
    console.log("Changing status:", { appointmentId, newStatus })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Programada</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completada</Badge>
      case "canceled":
        return <Badge className="bg-red-100 text-red-800">Cancelada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getSpeciesIcon = (species: string) => {
    return species === "perro" ? "🐕" : species === "gato" ? "🐱" : "🐾"
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
              <BreadcrumbPage>Citas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Gestión de Citas</h1>
            <p className="text-blue-600">Administra todas las citas programadas en el spa</p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Cita
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CalendarClock className="w-5 h-5 text-blue-600" />
                  Programar Nueva Cita
                </DialogTitle>
                <DialogDescription>Completa la información para programar una nueva cita</DialogDescription>
              </DialogHeader>
              <form onSubmit={addFormik.handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-date">Fecha *</Label>
                    <Input
                      id="add-date"
                      name="date"
                      type="date"
                      value={addFormik.values.date}
                      onChange={addFormik.handleChange}
                      onBlur={addFormik.handleBlur}
                      className={addFormik.touched.date && addFormik.errors.date ? "border-red-500" : ""}
                    />
                    {addFormik.touched.date && addFormik.errors.date && (
                      <p className="text-sm text-red-600">{addFormik.errors.date}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="add-time">Hora *</Label>
                    <Input
                      id="add-time"
                      name="time"
                      type="time"
                      value={addFormik.values.time}
                      onChange={addFormik.handleChange}
                      onBlur={addFormik.handleBlur}
                      className={addFormik.touched.time && addFormik.errors.time ? "border-red-500" : ""}
                    />
                    {addFormik.touched.time && addFormik.errors.time && (
                      <p className="text-sm text-red-600">{addFormik.errors.time}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="add-service">Servicio *</Label>
                  <Select
                    name="service"
                    value={addFormik.values.service}
                    onValueChange={(value) => addFormik.setFieldValue("service", value)}
                  >
                    <SelectTrigger
                      className={addFormik.touched.service && addFormik.errors.service ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{service.name}</span>
                            <span className="text-sm text-gray-500 ml-2">${service.price}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {addFormik.touched.service && addFormik.errors.service && (
                    <p className="text-sm text-red-600">{addFormik.errors.service}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Mascotas *</Label>
                  <div className="border rounded-lg p-3 max-h-40 overflow-y-auto">
                    {pets.map((pet) => (
                      <div key={pet.id} className="flex items-center space-x-2 py-2">
                        <Checkbox
                          id={`pet-${pet.id}`}
                          checked={addFormik.values.pets.includes(pet.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              addFormik.setFieldValue("pets", [...addFormik.values.pets, pet.id])
                            } else {
                              addFormik.setFieldValue(
                                "pets",
                                addFormik.values.pets.filter((id) => id !== pet.id),
                              )
                            }
                          }}
                        />
                        <label htmlFor={`pet-${pet.id}`} className="flex items-center gap-2 cursor-pointer flex-1">
                          <span>{getSpeciesIcon(pet.species)}</span>
                          <div>
                            <span className="font-medium">{pet.name}</span>
                            <span className="text-sm text-gray-500 ml-2">({pet.owner})</span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                  {addFormik.touched.pets && addFormik.errors.pets && (
                    <p className="text-sm text-red-600">{addFormik.errors.pets}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="add-notes">Notas adicionales</Label>
                  <Textarea
                    id="add-notes"
                    name="notes"
                    value={addFormik.values.notes}
                    onChange={addFormik.handleChange}
                    onBlur={addFormik.handleBlur}
                    placeholder="Información adicional sobre la cita..."
                    className={addFormik.touched.notes && addFormik.errors.notes ? "border-red-500" : ""}
                  />
                  {addFormik.touched.notes && addFormik.errors.notes && (
                    <p className="text-sm text-red-600">{addFormik.errors.notes}</p>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Programar Cita
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-900">{totalAppointments}</div>
                  <p className="text-sm text-gray-600">Total Citas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{scheduledCount}</div>
              <p className="text-sm text-gray-600">Programadas</p>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <p className="text-sm text-gray-600">Completadas</p>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{canceledCount}</div>
              <p className="text-sm text-gray-600">Canceladas</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Lista de Citas</CardTitle>
            <CardDescription>Gestiona todas las citas programadas en el sistema</CardDescription>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por mascota, dueño o servicio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-blue-200 focus:border-blue-500"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 border-blue-200">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="scheduled">Programadas</SelectItem>
                  <SelectItem value="completed">Completadas</SelectItem>
                  <SelectItem value="canceled">Canceladas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha y Hora</TableHead>
                  <TableHead>Mascotas</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment._id} className="hover:bg-blue-50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="font-medium">{new Date(appointment.date).toLocaleDateString("es-ES")}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {appointment.time}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {appointment.pet.map((pet) => (
                          <div key={pet._id} className="flex items-center gap-2 text-sm">
                            <span>{getSpeciesIcon(pet.species)}</span>
                            <span className="font-medium">{pet.name}</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <div>
                          <div className="font-medium">{appointment.service.name}</div>
                          <div className="text-sm text-gray-500">${appointment.service.price}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{appointment.owner.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            {getStatusBadge(appointment.status)}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleChangeStatus(appointment._id, "scheduled")}>
                            <CalendarClock className="w-4 h-4 mr-2" />
                            Programada
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleChangeStatus(appointment._id, "completed")}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Completada
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleChangeStatus(appointment._id, "canceled")}>
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancelada
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditAppointment(appointment)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar Cita
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Eliminar Cita
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar cita?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Se eliminará permanentemente la cita programada.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteAppointment(appointment._id)}
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

            {filteredAppointments.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-500 mb-2">No se encontraron citas</p>
                <p className="text-gray-400">
                  {searchTerm || statusFilter !== "all"
                    ? "Intenta con otros filtros de búsqueda"
                    : "No hay citas programadas"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal de edición */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-blue-600" />
                Editar Cita
              </DialogTitle>
              <DialogDescription>Modifica la información de la cita</DialogDescription>
            </DialogHeader>
            <form onSubmit={editFormik.handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Fecha *</Label>
                  <Input
                    id="edit-date"
                    name="date"
                    type="date"
                    value={editFormik.values.date.toString()}
                    onChange={editFormik.handleChange}
                    onBlur={editFormik.handleBlur}
                    className={editFormik.touched.date && editFormik.errors.date ? "border-red-500" : ""}
                  />
                  {editFormik.touched.date && editFormik.errors.date && (
                    <p className="text-sm text-red-600">{editFormik.errors.date}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-time">Hora *</Label>
                  <Input
                    id="edit-time"
                    name="time"
                    type="time"
                    value={editFormik.values.time}
                    onChange={editFormik.handleChange}
                    onBlur={editFormik.handleBlur}
                    className={editFormik.touched.time && editFormik.errors.time ? "border-red-500" : ""}
                  />
                  {editFormik.touched.time && editFormik.errors.time && (
                    <p className="text-sm text-red-600">{editFormik.errors.time}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-service">Servicio *</Label>
                <Select
                  name="service"
                  value={editFormik.values.service}
                  onValueChange={(value) => editFormik.setFieldValue("service", value)}
                >
                  <SelectTrigger
                    className={editFormik.touched.service && editFormik.errors.service ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Selecciona un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{service.name}</span>
                          <span className="text-sm text-gray-500 ml-2">${service.price}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {editFormik.touched.service && editFormik.errors.service && (
                  <p className="text-sm text-red-600">{editFormik.errors.service}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Mascotas *</Label>
                <div className="border rounded-lg p-3 max-h-40 overflow-y-auto">
                  {pets.map((pet) => (
                    <div key={pet.id} className="flex items-center space-x-2 py-2">
                      <Checkbox
                        id={`edit-pet-${pet.id}`}
                        checked={editFormik.values.pets.includes(pet.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            editFormik.setFieldValue("pets", [...editFormik.values.pets, pet.id])
                          } else {
                            editFormik.setFieldValue(
                              "pets",
                              editFormik.values.pets.filter((id) => id !== pet.id),
                            )
                          }
                        }}
                      />
                      <label htmlFor={`edit-pet-${pet.id}`} className="flex items-center gap-2 cursor-pointer flex-1">
                        <span>{getSpeciesIcon(pet.species)}</span>
                        <div>
                          <span className="font-medium">{pet.name}</span>
                          <span className="text-sm text-gray-500 ml-2">({pet.owner})</span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                {editFormik.touched.pets && editFormik.errors.pets && (
                  <p className="text-sm text-red-600">{editFormik.errors.pets}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notas adicionales</Label>
                <Textarea
                  id="edit-notes"
                  name="notes"
                  value={editFormik.values.notes}
                  onChange={editFormik.handleChange}
                  onBlur={editFormik.handleBlur}
                  placeholder="Información adicional sobre la cita..."
                  className={editFormik.touched.notes && editFormik.errors.notes ? "border-red-500" : ""}
                />
                {editFormik.touched.notes && editFormik.errors.notes && (
                  <p className="text-sm text-red-600">{editFormik.errors.notes}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Guardar Cambios
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarInset>
  )
}

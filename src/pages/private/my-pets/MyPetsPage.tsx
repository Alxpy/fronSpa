import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import {
  Calendar,
  Edit,
  Heart,
  MoreHorizontal,
  PawPrint,
  Plus,
  Search,
  Trash2,
  Upload,
  Weight,
  Camera,
} from "lucide-react"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCreatePet, useDeletePet, useGetPets } from "@/hook/pets"

const petValidationSchema = Yup.object({
  name: Yup.string().required("El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  species: Yup.string().required("La especie es requerida"),
  breed: Yup.string(),
  age: Yup.number()
    .required("La edad es requerida")
    .min(0, "La edad debe ser mayor a 0")
    .max(30, "La edad debe ser menor a 30 años"),
  weight: Yup.number().min(0.1, "El peso debe ser mayor a 0").max(200, "El peso debe ser menor a 200 kg"),
  note: Yup.string().max(500, "La nota no puede exceder 500 caracteres"),
})

export default function MyPetsPage() {

  const { data: pets, isLoading } = useGetPets()
  const { mutate: createPet } = useCreatePet()
  const { mutate: deletePet } = useDeletePet()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPet, setSelectedPet] = useState<(typeof pets)[0] | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-blue-600 text-lg">Cargando mascotas...</div>
      </div>
    )
  }

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.species.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Formik para agregar mascota
  const addFormik = useFormik({
    initialValues: {
      name: "",
      species: "",
      breed: "",
      age: 0,
      weight: 0,
      note: "",
    },
    validationSchema: petValidationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Adding pet:", values)
      createPet(values)
      resetForm()
      setIsAddModalOpen(false)
    },
  })

  // Formik para editar mascota
  const editFormik = useFormik({
    initialValues: {
      name: selectedPet?.name || "",
      species: selectedPet?.species || "",
      breed: selectedPet?.breed || "",
      age: selectedPet?.age?.toString() || "",
      weight: selectedPet?.weight?.toString() || "",
      note: selectedPet?.note || "",
    },
    enableReinitialize: true,
    validationSchema: petValidationSchema,
    onSubmit: (values) => {
      console.log("Editing pet:", { ...selectedPet, ...values })
      setIsEditModalOpen(false)
      setSelectedPet(null)
    },
  })

  const handleEditPet = (pet: (typeof pets)[0]) => {
    setSelectedPet(pet)
    setIsEditModalOpen(true)
  }

  const getSpeciesIcon = (species: string) => {
    switch (species.toLowerCase()) {
      case "perro":
        return "🐕"
      case "gato":
        return "🐱"
      default:
        return "🐾"
    }
  }

  const getAgeText = (age: number) => {
    return age === 1 ? "1 año" : `${age} años`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Mis Mascotas</h1>
          <p className="text-xl text-gray-600">Gestiona la información de tus queridas mascotas</p>
        </div>

        {/* Barra de búsqueda y botón agregar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar mascotas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-blue-200 focus:border-blue-500"
            />
          </div>

          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Mascota
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <PawPrint className="w-5 h-5 text-blue-600" />
                  Agregar Nueva Mascota
                </DialogTitle>
                <DialogDescription>Completa la información de tu mascota</DialogDescription>
              </DialogHeader>
              <form onSubmit={addFormik.handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="add-name">Nombre *</Label>
                  <Input
                    id="add-name"
                    name="name"
                    value={addFormik.values.name}
                    onChange={addFormik.handleChange}
                    onBlur={addFormik.handleBlur}
                    className={addFormik.touched.name && addFormik.errors.name ? "border-red-500" : ""}
                  />
                  {addFormik.touched.name && addFormik.errors.name && (
                    <p className="text-sm text-red-600">{addFormik.errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-species">Especie *</Label>
                    <Select
                      name="species"
                      value={addFormik.values.species}
                      onValueChange={(value) => addFormik.setFieldValue("species", value)}
                    >
                      <SelectTrigger
                        className={addFormik.touched.species && addFormik.errors.species ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="perro">🐕 Perro</SelectItem>
                        <SelectItem value="gato">🐱 Gato</SelectItem>
                        <SelectItem value="otro">🐾 Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    {addFormik.touched.species && addFormik.errors.species && (
                      <p className="text-sm text-red-600">{addFormik.errors.species}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="add-breed">Raza</Label>
                    <Input
                      id="add-breed"
                      name="breed"
                      value={addFormik.values.breed}
                      onChange={addFormik.handleChange}
                      placeholder="Ej: Golden Retriever"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-age">Edad (años) *</Label>
                    <Input
                      id="add-age"
                      name="age"
                      type="number"
                      value={addFormik.values.age}
                      onChange={addFormik.handleChange}
                      onBlur={addFormik.handleBlur}
                      className={addFormik.touched.age && addFormik.errors.age ? "border-red-500" : ""}
                    />
                    {addFormik.touched.age && addFormik.errors.age && (
                      <p className="text-sm text-red-600">{addFormik.errors.age}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="add-weight">Peso (kg)</Label>
                    <Input
                      id="add-weight"
                      name="weight"
                      type="number"
                      step="0.1"
                      value={addFormik.values.weight}
                      onChange={addFormik.handleChange}
                      onBlur={addFormik.handleBlur}
                      className={addFormik.touched.weight && addFormik.errors.weight ? "border-red-500" : ""}
                    />
                    {addFormik.touched.weight && addFormik.errors.weight && (
                      <p className="text-sm text-red-600">{addFormik.errors.weight}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="add-note">Notas adicionales</Label>
                  <Textarea
                    id="add-note"
                    name="note"
                    value={addFormik.values.note}
                    onChange={addFormik.handleChange}
                    onBlur={addFormik.handleBlur}
                    placeholder="Información adicional sobre tu mascota..."
                    className={addFormik.touched.note && addFormik.errors.note ? "border-red-500" : ""}
                  />
                  {addFormik.touched.note && addFormik.errors.note && (
                    <p className="text-sm text-red-600">{addFormik.errors.note}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Foto de la mascota</Label>
                  <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                    <Camera className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Arrastra una imagen o haz clic para seleccionar</p>
                    <Button type="button" variant="outline" size="sm" className="mt-2">
                      <Upload className="w-4 h-4 mr-2" />
                      Subir Foto
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Agregar Mascota
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {filteredPets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map((pet) => (
              <Card
                key={pet._id}
                className="group hover:shadow-xl transition-all duration-300 border-blue-100 overflow-hidden"
              >
                <CardHeader className="p-0 relative">
                  <div className="relative">
                    <img
                      src={pet.image || "https://www.muyinteresante.com/wp-content/uploads/sites/5/2025/02/Portada-normal-111.jpg?w=550&h=309&crop=1"}
                      alt={pet.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-blue-600 text-white">
                        <span className="mr-1">{getSpeciesIcon(pet.species)}</span>
                        {pet.species.charAt(0).toUpperCase() + pet.species.slice(1)}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleEditPet(pet)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => {
                                  e.preventDefault()
                                }}
                                className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar a {pet.name}?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Se eliminará permanentemente la información de tu
                                  mascota.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={(e) => {
                                    e.preventDefault()
                                    deletePet(pet._id)
                                  }}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      {pet.name}
                    </CardTitle>
                  </div>

                  {pet.breed && <p className="text-sm font-medium text-gray-700">Raza: {pet.breed}</p>}

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{getAgeText(pet.age)}</span>
                    </div>
                    {pet.weight && (
                      <div className="flex items-center gap-1">
                        <Weight className="w-4 h-4" />
                        <span>{pet.weight} kg</span>
                      </div>
                    )}
                  </div>

                  {pet.note && <CardDescription className="text-sm line-clamp-2">{pet.note}</CardDescription>}

                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Registrado el {new Date(pet.createdAt).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <PawPrint className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              {searchTerm ? "No se encontraron mascotas" : "Aún no tienes mascotas registradas"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? "Intenta con otros términos de búsqueda"
                : "Agrega tu primera mascota para comenzar a gestionar su información"}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Mi Primera Mascota
              </Button>
            )}
          </div>
        )}

        {/* Modal de edición */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-blue-600" />
                Editar {selectedPet?.name}
              </DialogTitle>
              <DialogDescription>Modifica la información de tu mascota</DialogDescription>
            </DialogHeader>
            <form onSubmit={editFormik.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nombre *</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={editFormik.values.name}
                  onChange={editFormik.handleChange}
                  onBlur={editFormik.handleBlur}
                  className={editFormik.touched.name && editFormik.errors.name ? "border-red-500" : ""}
                />
                {editFormik.touched.name && editFormik.errors.name && (
                  <p className="text-sm text-red-600">{editFormik.errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-species">Especie *</Label>
                  <Select
                    name="species"
                    value={editFormik.values.species}
                    onValueChange={(value) => editFormik.setFieldValue("species", value)}
                  >
                    <SelectTrigger
                      className={editFormik.touched.species && editFormik.errors.species ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perro">🐕 Perro</SelectItem>
                      <SelectItem value="gato">🐱 Gato</SelectItem>
                      <SelectItem value="otro">🐾 Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  {editFormik.touched.species && editFormik.errors.species && (
                    <p className="text-sm text-red-600">{editFormik.errors.species}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-breed">Raza</Label>
                  <Input
                    id="edit-breed"
                    name="breed"
                    value={editFormik.values.breed}
                    onChange={editFormik.handleChange}
                    placeholder="Ej: Golden Retriever"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-age">Edad (años) *</Label>
                  <Input
                    id="edit-age"
                    name="age"
                    type="number"
                    value={editFormik.values.age}
                    onChange={editFormik.handleChange}
                    onBlur={editFormik.handleBlur}
                    className={editFormik.touched.age && editFormik.errors.age ? "border-red-500" : ""}
                  />
                  {editFormik.touched.age && editFormik.errors.age && (
                    <p className="text-sm text-red-600">{editFormik.errors.age}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-weight">Peso (kg)</Label>
                  <Input
                    id="edit-weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    value={editFormik.values.weight}
                    onChange={editFormik.handleChange}
                    onBlur={editFormik.handleBlur}
                    className={editFormik.touched.weight && editFormik.errors.weight ? "border-red-500" : ""}
                  />
                  {editFormik.touched.weight && editFormik.errors.weight && (
                    <p className="text-sm text-red-600">{editFormik.errors.weight}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-note">Notas adicionales</Label>
                <Textarea
                  id="edit-note"
                  name="note"
                  value={editFormik.values.note}
                  onChange={editFormik.handleChange}
                  onBlur={editFormik.handleBlur}
                  placeholder="Información adicional sobre tu mascota..."
                  className={editFormik.touched.note && editFormik.errors.note ? "border-red-500" : ""}
                />
                {editFormik.touched.note && editFormik.errors.note && (
                  <p className="text-sm text-red-600">{editFormik.errors.note}</p>
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
    </div>
  )
}

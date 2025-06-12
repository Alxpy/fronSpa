"use client"

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
  Sparkles,
  Star,
  Award,
  Activity,
} from "lucide-react"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCreatePet, useDeletePet, useGetPets } from "@/hook/pets"

const petValidationSchema = Yup.object({
  name: Yup.string().required("El nombre es requerido").min(2, "El nombre debe tener al menos 2 caracteres"),
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
            <p className="text-xl text-amber-700 font-medium">Cargando tus mascotas...</p>
          </div>
        </div>
      </div>
    )
  }

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.species.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

  const getSpeciesGradient = (species: string) => {
    switch (species.toLowerCase()) {
      case "perro":
        return "from-blue-500 to-indigo-500"
      case "gato":
        return "from-purple-500 to-pink-500"
      default:
        return "from-amber-500 to-orange-500"
    }
  }

  const getAgeText = (age: number) => {
    return age === 1 ? "1 año" : `${age} años`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-orange-200 rounded-full opacity-40 animate-bounce"></div>

      <div className="container mx-auto px-4 py-8 relative">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <PawPrint className="w-4 h-4 mr-2" />
            Mi Familia Peluda
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Mis{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Mascotas
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gestiona la información de tus queridas mascotas y mantén un registro completo de su bienestar
          </p>
        </div>

        {/* Barra de búsqueda y botón agregar */}
        <div className="mb-10">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
                  <Input
                    placeholder="Buscar por nombre, raza o especie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl bg-white/50"
                  />
                </div>

                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-12">
                      <Plus className="w-5 h-5 mr-2" />
                      Agregar Mascota
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-amber-200">
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-gray-900 flex items-center">
                        <PawPrint className="w-6 h-6 mr-2 text-amber-500" />
                        Agregar Nueva Mascota
                      </DialogTitle>
                      <DialogDescription className="text-base text-gray-600">
                        Completa la información de tu nueva mascota para crear su perfil
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={addFormik.handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="add-name" className="text-gray-700 font-medium flex items-center">
                          <Heart className="w-4 h-4 mr-2 text-amber-500" />
                          Nombre *
                        </Label>
                        <Input
                          id="add-name"
                          name="name"
                          value={addFormik.values.name}
                          onChange={addFormik.handleChange}
                          onBlur={addFormik.handleBlur}
                          placeholder="Nombre de tu mascota"
                          className={`border-2 rounded-xl ${
                            addFormik.touched.name && addFormik.errors.name
                              ? "border-red-500"
                              : "border-amber-200 focus:border-amber-400"
                          }`}
                        />
                        {addFormik.touched.name && addFormik.errors.name && (
                          <p className="text-sm text-red-600 font-medium">{addFormik.errors.name}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="add-species" className="text-gray-700 font-medium flex items-center">
                            <PawPrint className="w-4 h-4 mr-2 text-amber-500" />
                            Especie *
                          </Label>
                          <Select
                            name="species"
                            value={addFormik.values.species}
                            onValueChange={(value) => addFormik.setFieldValue("species", value)}
                          >
                            <SelectTrigger
                              className={`border-2 rounded-xl ${
                                addFormik.touched.species && addFormik.errors.species
                                  ? "border-red-500"
                                  : "border-amber-200 focus:border-amber-400"
                              }`}
                            >
                              <SelectValue placeholder="Selecciona la especie" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="perro">🐕 Perro</SelectItem>
                              <SelectItem value="gato">🐱 Gato</SelectItem>
                              <SelectItem value="otro">🐾 Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          {addFormik.touched.species && addFormik.errors.species && (
                            <p className="text-sm text-red-600 font-medium">{addFormik.errors.species}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="add-breed" className="text-gray-700 font-medium flex items-center">
                            <Award className="w-4 h-4 mr-2 text-amber-500" />
                            Raza
                          </Label>
                          <Input
                            id="add-breed"
                            name="breed"
                            value={addFormik.values.breed}
                            onChange={addFormik.handleChange}
                            placeholder="Ej: Golden Retriever"
                            className="border-2 border-amber-200 focus:border-amber-400 rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="add-age" className="text-gray-700 font-medium flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-amber-500" />
                            Edad (años) *
                          </Label>
                          <Input
                            id="add-age"
                            name="age"
                            type="number"
                            value={addFormik.values.age}
                            onChange={addFormik.handleChange}
                            onBlur={addFormik.handleBlur}
                            className={`border-2 rounded-xl ${
                              addFormik.touched.age && addFormik.errors.age
                                ? "border-red-500"
                                : "border-amber-200 focus:border-amber-400"
                            }`}
                          />
                          {addFormik.touched.age && addFormik.errors.age && (
                            <p className="text-sm text-red-600 font-medium">{addFormik.errors.age}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="add-weight" className="text-gray-700 font-medium flex items-center">
                            <Weight className="w-4 h-4 mr-2 text-amber-500" />
                            Peso (kg)
                          </Label>
                          <Input
                            id="add-weight"
                            name="weight"
                            type="number"
                            step="0.1"
                            value={addFormik.values.weight}
                            onChange={addFormik.handleChange}
                            onBlur={addFormik.handleBlur}
                            className={`border-2 rounded-xl ${
                              addFormik.touched.weight && addFormik.errors.weight
                                ? "border-red-500"
                                : "border-amber-200 focus:border-amber-400"
                            }`}
                          />
                          {addFormik.touched.weight && addFormik.errors.weight && (
                            <p className="text-sm text-red-600 font-medium">{addFormik.errors.weight}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="add-note" className="text-gray-700 font-medium flex items-center">
                          <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
                          Notas especiales
                        </Label>
                        <Textarea
                          id="add-note"
                          name="note"
                          value={addFormik.values.note}
                          onChange={addFormik.handleChange}
                          onBlur={addFormik.handleBlur}
                          placeholder="Información adicional sobre tu mascota..."
                          className={`border-2 rounded-xl ${
                            addFormik.touched.note && addFormik.errors.note
                              ? "border-red-500"
                              : "border-amber-200 focus:border-amber-400"
                          }`}
                        />
                        {addFormik.touched.note && addFormik.errors.note && (
                          <p className="text-sm text-red-600 font-medium">{addFormik.errors.note}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium flex items-center">
                          <Camera className="w-4 h-4 mr-2 text-amber-500" />
                          Foto de la mascota
                        </Label>
                        <div className="border-2 border-dashed border-amber-300 rounded-xl p-6 text-center hover:border-amber-400 transition-colors bg-amber-50/50">
                          <Camera className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                          <p className="text-sm text-gray-600 mb-3">Arrastra una imagen o haz clic para seleccionar</p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="border-amber-300 text-amber-700 hover:bg-amber-50"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Subir Foto
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-amber-200">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsAddModalOpen(false)}
                          className="border-amber-300 text-amber-700 hover:bg-amber-50"
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Agregar Mascota
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {filteredPets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPets.map((pet) => (
              <Card
                key={pet._id}
                className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden bg-white/80 backdrop-blur-sm transform hover:-translate-y-2"
              >
                <CardHeader className="p-0 relative">
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        pet.image ||
                        "https://www.muyinteresante.com/wp-content/uploads/sites/5/2025/02/Portada-normal-111.jpg?w=550&h=309&crop=1" ||
                        "/placeholder.svg"
                      }
                      alt={pet.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute top-4 left-4">
                      <Badge
                        className={`bg-gradient-to-r ${getSpeciesGradient(pet.species)} text-white border-0 shadow-lg`}
                      >
                        <span className="mr-1">{getSpeciesIcon(pet.species)}</span>
                        {pet.species.charAt(0).toUpperCase() + pet.species.slice(1)}
                      </Badge>
                    </div>

                    <div className="absolute top-4 right-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="bg-white/90 hover:bg-white shadow-lg rounded-full w-10 h-10 p-0"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white/95 backdrop-blur-sm border-amber-200">
                          <DropdownMenuItem onClick={() => handleEditPet(pet)} className="hover:bg-amber-50">
                            <Edit className="w-4 h-4 mr-2 text-amber-600" />
                            Editar
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => {
                                  e.preventDefault()
                                }}
                                className="text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white/95 backdrop-blur-sm border-amber-200">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-gray-900">¿Eliminar a {pet.name}?</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-600">
                                  Esta acción no se puede deshacer. Se eliminará permanentemente la información de tu
                                  mascota.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-amber-300 text-amber-700 hover:bg-amber-50">
                                  Cancelar
                                </AlertDialogCancel>
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

                    {/* Premium Badge */}
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      ✨ Miembro VIP
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl text-gray-900 flex items-center group-hover:text-amber-700 transition-colors">
                      <Heart className="w-6 h-6 text-red-500 mr-2" />
                      {pet.name}
                    </CardTitle>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>

                  {pet.breed && (
                    <div className="flex items-center">
                      <Award className="w-4 h-4 text-amber-500 mr-2" />
                      <span className="text-gray-700 font-medium">Raza: {pet.breed}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-6 text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-amber-500 mr-2" />
                      <span className="font-medium">{getAgeText(pet.age)}</span>
                    </div>
                    {pet.weight && (
                      <div className="flex items-center">
                        <Weight className="w-4 h-4 text-amber-500 mr-2" />
                        <span className="font-medium">{pet.weight} kg</span>
                      </div>
                    )}
                  </div>

                  {pet.note && (
                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                      <CardDescription className="text-gray-700 line-clamp-2">{pet.note}</CardDescription>
                    </div>
                  )}

                  <div className="pt-3 border-t border-amber-100 flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Activity className="w-3 h-3 mr-1 text-amber-500" />
                      Registrado el {new Date(pet.createdAt).toLocaleDateString("es-ES")}
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Activo
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <PawPrint className="w-16 h-16 text-amber-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {searchTerm ? "No se encontraron mascotas" : "¡Tu primera mascota te está esperando!"}
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm
                ? "Intenta con otros términos de búsqueda o revisa los filtros"
                : "Agrega tu primera mascota para comenzar a gestionar su información y crear recuerdos increíbles"}
            </p>
            {!searchTerm && (
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-12"
              >
                <Plus className="w-5 h-5 mr-2" />
                Agregar Mi Primera Mascota
              </Button>
            )}
          </div>
        )}

        {/* Modal de edición */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-amber-200">
            <DialogHeader>
              <DialogTitle className="text-2xl text-gray-900 flex items-center">
                <Edit className="w-6 h-6 mr-2 text-amber-500" />
                Editar {selectedPet?.name}
              </DialogTitle>
              <DialogDescription className="text-base text-gray-600">
                Modifica la información de tu mascota
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={editFormik.handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-gray-700 font-medium flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-amber-500" />
                  Nombre *
                </Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={editFormik.values.name}
                  onChange={editFormik.handleChange}
                  onBlur={editFormik.handleBlur}
                  className={`border-2 rounded-xl ${
                    editFormik.touched.name && editFormik.errors.name
                      ? "border-red-500"
                      : "border-amber-200 focus:border-amber-400"
                  }`}
                />
                {editFormik.touched.name && editFormik.errors.name && (
                  <p className="text-sm text-red-600 font-medium">{editFormik.errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-species" className="text-gray-700 font-medium flex items-center">
                    <PawPrint className="w-4 h-4 mr-2 text-amber-500" />
                    Especie *
                  </Label>
                  <Select
                    name="species"
                    value={editFormik.values.species}
                    onValueChange={(value) => editFormik.setFieldValue("species", value)}
                  >
                    <SelectTrigger
                      className={`border-2 rounded-xl ${
                        editFormik.touched.species && editFormik.errors.species
                          ? "border-red-500"
                          : "border-amber-200 focus:border-amber-400"
                      }`}
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
                    <p className="text-sm text-red-600 font-medium">{editFormik.errors.species}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-breed" className="text-gray-700 font-medium flex items-center">
                    <Award className="w-4 h-4 mr-2 text-amber-500" />
                    Raza
                  </Label>
                  <Input
                    id="edit-breed"
                    name="breed"
                    value={editFormik.values.breed}
                    onChange={editFormik.handleChange}
                    placeholder="Ej: Golden Retriever"
                    className="border-2 border-amber-200 focus:border-amber-400 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-age" className="text-gray-700 font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-amber-500" />
                    Edad (años) *
                  </Label>
                  <Input
                    id="edit-age"
                    name="age"
                    type="number"
                    value={editFormik.values.age}
                    onChange={editFormik.handleChange}
                    onBlur={editFormik.handleBlur}
                    className={`border-2 rounded-xl ${
                      editFormik.touched.age && editFormik.errors.age
                        ? "border-red-500"
                        : "border-amber-200 focus:border-amber-400"
                    }`}
                  />
                  {editFormik.touched.age && editFormik.errors.age && (
                    <p className="text-sm text-red-600 font-medium">{editFormik.errors.age}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-weight" className="text-gray-700 font-medium flex items-center">
                    <Weight className="w-4 h-4 mr-2 text-amber-500" />
                    Peso (kg)
                  </Label>
                  <Input
                    id="edit-weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    value={editFormik.values.weight}
                    onChange={editFormik.handleChange}
                    onBlur={editFormik.handleBlur}
                    className={`border-2 rounded-xl ${
                      editFormik.touched.weight && editFormik.errors.weight
                        ? "border-red-500"
                        : "border-amber-200 focus:border-amber-400"
                    }`}
                  />
                  {editFormik.touched.weight && editFormik.errors.weight && (
                    <p className="text-sm text-red-600 font-medium">{editFormik.errors.weight}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-note" className="text-gray-700 font-medium flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
                  Notas especiales
                </Label>
                <Textarea
                  id="edit-note"
                  name="note"
                  value={editFormik.values.note}
                  onChange={editFormik.handleChange}
                  onBlur={editFormik.handleBlur}
                  placeholder="Información adicional sobre tu mascota..."
                  className={`border-2 rounded-xl ${
                    editFormik.touched.note && editFormik.errors.note
                      ? "border-red-500"
                      : "border-amber-200 focus:border-amber-400"
                  }`}
                />
                {editFormik.touched.note && editFormik.errors.note && (
                  <p className="text-sm text-red-600 font-medium">{editFormik.errors.note}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-amber-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                  className="border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
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

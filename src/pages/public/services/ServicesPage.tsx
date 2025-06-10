import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
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
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Navbar } from "@/components/navbar/Navbar"
import { Calendar, Clock, Heart, Scissors, Shield, Sparkles } from "lucide-react"
import { useGetServices } from "@/hook/services"
import { useGetPets } from "@/hook/pets"
import { useState } from "react"
import { useCreateAppointment } from "@/hook/appointment"
import { toast } from "sonner"
import { DialogClose } from "@radix-ui/react-dialog"
import { useProfile } from "@/hook/auth"

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

// Esquema de validación para el formulario de reserva
const bookingSchema = Yup.object().shape({
  date: Yup.string().required("La fecha es requerida"),
  time: Yup.string().required("La hora es requerida"),
  pets: Yup.array()
    .of(Yup.string())
    .min(1, "Debes seleccionar al menos una mascota")
    .required("Debes seleccionar al menos una mascota"),
  notes: Yup.string(),
  status: Yup.string().default("scheduled")
})

export default function ServicesPage() {
  const { data: services, isLoading } = useGetServices()
  const { mutate: createAppointment } = useCreateAppointment()
  const { data: pets } = useGetPets()
  const { data: profile } = useProfile()
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)

  const initialValues = {
    date: "",
    time: "",
    pets: [] as string[],
    notes: "",
    status: "scheduled",
    service: ""
  }

  if (isLoading) {
    return <div className="text-center py-8">Cargando servicios...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Servicios de Spa</h1>
          <p className="text-xl text-gray-600">Servicios profesionales para el bienestar y cuidado de tu mascota</p>
        </div>

        {/* Grid de servicios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = categoryIcons[service.category]
            return (
              <Card key={service._id} className="hover:shadow-lg transition-shadow border-blue-100">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                    <Badge className={categoryColors[service.category]}>
                      {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                    </Badge>
                  </div>
                  <img
                    src={service.image || "https://via.placeholder.com/300x200.png?text=Imagen+del+Servicio"}
                    alt={service.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <CardTitle className="text-xl text-blue-900">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">${service.price}</span>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{service.duration} min</span>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => setSelectedService(service)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Reservar Cita
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Reservar: {service.name}</DialogTitle>
                        <DialogDescription>Completa los datos para agendar tu cita</DialogDescription>
                      </DialogHeader>

                      <Formik
                        initialValues={initialValues}
                        validationSchema={bookingSchema}
                        onSubmit={(values, { setSubmitting }) => {
                          if (!selectedService || !selectedService._id) {
                            toast.error("Por favor, selecciona un servicio antes de reservar.")
                            return
                          }
                          createAppointment({
                            date: values.date,
                            time: values.time,
                            pet: values.pets,
                            notes: values.notes,
                            service: selectedService._id
                          }, {
                            onSuccess: () => {
                              document.activeElement && (document.activeElement as HTMLElement).blur()
                            },
                            onSettled: () => {
                              setSubmitting(false)
                            }
                          })
                        }}
                      >
                        {({ values, isSubmitting, setFieldValue }) => (
                          <Form className="space-y-4">
                            <div className="space-y-2">
                              <Label>Selecciona tus mascotas *</Label>
                              <div className="space-y-3">
                                {pets?.map((pet) => (
                                  <div key={pet._id} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`pet-${pet._id}`}
                                      name="pets"
                                      value={pet._id}
                                      onCheckedChange={(checked) => {
                                        const currentPets = values.pets
                                        if (checked) {
                                          setFieldValue("pets", [...currentPets, pet._id])
                                        } else {
                                          setFieldValue("pets", currentPets.filter((id: string) => id !== pet._id))
                                        }
                                      }}
                                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <Label htmlFor={`pet-${pet._id}`} className="flex items-center gap-2">
                                      {pet.image && (
                                        <img
                                          src={pet.image}
                                          alt={pet.name}
                                          className="w-8 h-8 rounded-full object-cover"
                                        />
                                      )}
                                      <div>
                                        <span className="font-medium">{pet.name}</span>
                                        <span className="text-sm text-gray-500 ml-2">{pet.breed}</span>
                                      </div>
                                    </Label>
                                  </div>
                                ))}
                              </div>
                              <ErrorMessage name="pets" component="p" className="text-sm text-red-600" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="date">Fecha *</Label>
                                <Field
                                  as={Input}
                                  id="date"
                                  name="date"
                                  type="date"
                                  required
                                />
                                <ErrorMessage name="date" component="p" className="text-sm text-red-600" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="time">Hora *</Label>
                                <Field
                                  as={Input}
                                  id="time"
                                  name="time"
                                  type="time"
                                  required
                                />
                                <ErrorMessage name="time" component="p" className="text-sm text-red-600" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="notes">Notas Adicionales</Label>
                              <Field
                                as={Textarea}
                                id="notes"
                                name="notes"
                                placeholder="Información adicional sobre tu mascota..."
                              />
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Total:</span>
                                <span className="text-xl font-bold text-blue-600">${service.price}</span>
                              </div>
                              <div className="text-sm text-gray-600 mt-1">Duración: {service.duration} minutos</div>
                            </div>
                            <DialogClose asChild>
                              <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                disabled={isSubmitting || !profile}
                              >
                                {isSubmitting ? "Reservando..." : "Confirmar Reserva"}
                              </Button>
                            </DialogClose>
                          </Form>
                        )}
                      </Formik>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">¿Cómo funciona nuestro servicio?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Reserva tu Cita</h3>
              <p className="text-gray-600">Selecciona el servicio y agenda tu cita en línea</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Trae a tu Mascota</h3>
              <p className="text-gray-600">Llega puntual con tu mascota el día de la cita</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Disfruta el Resultado</h3>
              <p className="text-gray-600">Tu mascota saldrá feliz y relajada</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
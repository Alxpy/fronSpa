"use client"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "@/components/navbar/Navbar"
import {
  Calendar,
  Clock,
  Heart,
  Scissors,
  Shield,
  Sparkles,
  Star,
  Award,
  CheckCircle,
  PawPrint,
  Timer,
} from "lucide-react"
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
  belleza: "bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border-pink-200",
  relajacion: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200",
  salud: "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200",
  otro: "bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200",
}

const bookingSchema = Yup.object().shape({
  date: Yup.string().required("La fecha es requerida"),
  time: Yup.string().required("La hora es requerida"),
  pets: Yup.array()
    .of(Yup.string())
    .min(1, "Debes seleccionar al menos una mascota")
    .required("Debes seleccionar al menos una mascota"),
  notes: Yup.string(),
  status: Yup.string().default("scheduled"),
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
    service: "",
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
            <p className="text-xl text-amber-700 font-medium">Cargando servicios premium...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Navbar />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-orange-200 rounded-full opacity-40 animate-bounce"></div>

      <div className="container mx-auto px-4 py-8 relative">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Servicios Premium de Spa
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Experiencias{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">únicas</span>{" "}
            para tu mascota
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestros servicios profesionales diseñados para el bienestar, relajación y cuidado integral de tu
            compañero peludo
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => {
            const IconComponent = categoryIcons[service.category]
            return (
              <Card
                key={service._id}
                className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden bg-white/80 backdrop-blur-sm transform hover:-translate-y-2"
              >
                <CardHeader className="p-0 relative">
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image || "https://via.placeholder.com/300x200.png?text=Imagen+del+Servicio"}
                      alt={service.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={`${categoryColors[service.category]} border shadow-lg`}>
                        <IconComponent className="w-3 h-3 mr-1" />
                        {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                      </Badge>
                    </div>

                    {/* Premium Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      ✨ Premium
                    </div>

                    {/* Rating */}
                    <div className="absolute bottom-4 left-4 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                      <Star className="w-4 h-4 text-amber-400 fill-current mr-1" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-900 group-hover:text-amber-700 transition-colors mb-2">
                        {service.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">{service.description}</CardDescription>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-amber-100">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-500">
                        <Timer className="w-4 h-4 mr-1 text-amber-500" />
                        <span className="text-sm font-medium">{service.duration} min</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Award className="w-4 h-4 mr-1 text-amber-500" />
                        <span className="text-sm font-medium">Certificado</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                        ${service.price}
                      </div>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-12"
                        onClick={() => setSelectedService(service)}
                      >
                        <Calendar className="w-5 h-5 mr-2" />
                        Reservar Experiencia
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-sm border-amber-200">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-gray-900 flex items-center">
                          <Sparkles className="w-6 h-6 mr-2 text-amber-500" />
                          Reservar: {service.name}
                        </DialogTitle>
                        <DialogDescription className="text-base text-gray-600">
                          Completa los datos para agendar esta experiencia premium para tu mascota
                        </DialogDescription>
                      </DialogHeader>

                      <Formik
                        initialValues={initialValues}
                        validationSchema={bookingSchema}
                        onSubmit={(values, { setSubmitting }) => {
                          if (!selectedService || !selectedService._id) {
                            toast.error("Por favor, selecciona un servicio antes de reservar.")
                            return
                          }
                          createAppointment(
                            {
                              date: values.date,
                              time: values.time,
                              pet: values.pets,
                              notes: values.notes,
                              service: selectedService._id,
                            },
                            {
                              onSuccess: () => {
                                document.activeElement && (document.activeElement as HTMLElement).blur()
                              },
                              onSettled: () => {
                                setSubmitting(false)
                              },
                            },
                          )
                        }}
                      >
                        {({ values, isSubmitting, setFieldValue }) => (
                          <Form className="space-y-6">
                            <div className="space-y-3">
                              <Label className="text-gray-700 font-medium flex items-center">
                                <PawPrint className="w-4 h-4 mr-2 text-amber-500" />
                                Selecciona tus mascotas *
                              </Label>
                              <div className="space-y-3 max-h-40 overflow-y-auto">
                                {pets?.map((pet) => (
                                  <div
                                    key={pet._id}
                                    className="flex items-center space-x-3 p-3 bg-amber-50 rounded-xl border border-amber-200 hover:bg-amber-100 transition-colors"
                                  >
                                    <Checkbox
                                      id={`pet-${pet._id}`}
                                      name="pets"
                                      value={pet._id}
                                      onCheckedChange={(checked) => {
                                        const currentPets = values.pets
                                        if (checked) {
                                          setFieldValue("pets", [...currentPets, pet._id])
                                        } else {
                                          setFieldValue(
                                            "pets",
                                            currentPets.filter((id: string) => id !== pet._id),
                                          )
                                        }
                                      }}
                                      className="h-5 w-5 text-amber-600 focus:ring-amber-500 border-amber-300 rounded"
                                    />
                                    <Avatar className="w-10 h-10 border-2 border-amber-300">
                                      <AvatarImage src={pet.image || "/placeholder.svg"} alt={pet.name} />
                                      <AvatarFallback className="bg-amber-200 text-amber-800 font-bold">
                                        {pet.name.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <Label htmlFor={`pet-${pet._id}`} className="flex-1 cursor-pointer">
                                      <div className="font-medium text-gray-900">{pet.name}</div>
                                      <div className="text-sm text-gray-500">{pet.breed}</div>
                                    </Label>
                                  </div>
                                ))}
                              </div>
                              <ErrorMessage name="pets" component="p" className="text-sm text-red-600 font-medium" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="date" className="text-gray-700 font-medium flex items-center">
                                  <Calendar className="w-4 h-4 mr-2 text-amber-500" />
                                  Fecha *
                                </Label>
                                <Field
                                  as={Input}
                                  id="date"
                                  name="date"
                                  type="date"
                                  required
                                  className="border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl"
                                />
                                <ErrorMessage name="date" component="p" className="text-sm text-red-600 font-medium" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="time" className="text-gray-700 font-medium flex items-center">
                                  <Clock className="w-4 h-4 mr-2 text-amber-500" />
                                  Hora *
                                </Label>
                                <Field
                                  as={Input}
                                  id="time"
                                  name="time"
                                  type="time"
                                  required
                                  className="border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl"
                                />
                                <ErrorMessage name="time" component="p" className="text-sm text-red-600 font-medium" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="notes" className="text-gray-700 font-medium flex items-center">
                                <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
                                Notas Especiales
                              </Label>
                              <Field
                                as={Textarea}
                                id="notes"
                                name="notes"
                                placeholder="Cuéntanos sobre las preferencias especiales de tu mascota..."
                                className="border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl"
                              />
                            </div>

                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-gray-900">Resumen de la Reserva:</span>
                                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                                  ${service.price}
                                </div>
                              </div>
                              <div className="flex items-center text-sm text-gray-600 space-x-4">
                                <div className="flex items-center">
                                  <Timer className="w-4 h-4 mr-1 text-amber-500" />
                                  Duración: {service.duration} minutos
                                </div>
                                <div className="flex items-center">
                                  <Award className="w-4 h-4 mr-1 text-amber-500" />
                                  Servicio Premium
                                </div>
                              </div>
                            </div>

                            <DialogClose asChild>
                              <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-12"
                                disabled={isSubmitting || !profile}
                              >
                                {isSubmitting ? (
                                  <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Reservando...
                                  </div>
                                ) : (
                                  <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    Confirmar Reserva Premium
                                  </div>
                                )}
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
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>

          <div className="relative">
            <h2 className="text-4xl font-bold mb-8 text-center">¿Cómo funciona nuestra experiencia premium?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <div className="text-2xl font-bold">1</div>
                </div>
                <h3 className="text-xl font-bold mb-3">Reserva tu Experiencia</h3>
                <p className="text-white/90 leading-relaxed">
                  Selecciona el servicio premium perfecto para tu mascota y agenda tu cita en línea de forma rápida y
                  sencilla
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <div className="text-2xl font-bold">2</div>
                </div>
                <h3 className="text-xl font-bold mb-3">Disfruta el Momento</h3>
                <p className="text-white/90 leading-relaxed">
                  Llega puntual y relájate mientras nuestros expertos cuidan de tu mascota con productos premium y
                  técnicas especializadas
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <div className="text-2xl font-bold">3</div>
                </div>
                <h3 className="text-xl font-bold mb-3">Resultado Extraordinario</h3>
                <p className="text-white/90 leading-relaxed">
                  Tu mascota saldrá completamente renovada, feliz y relajada, lista para disfrutar de su nueva
                  apariencia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

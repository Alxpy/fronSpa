"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRegister } from "@/hook/auth"
import { PawPrint, User, Mail, Phone, MapPin, FileText, Lock, ArrowLeft, Sparkles } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Form } from "formik"
import InputField from "@/components/field/InputField"

export default function RegisterPage() {
  const { mutate: register } = useRegister()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Column - Image and Branding */}
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-3xl"></div>
            <div className="relative">
              {/* Logo */}
              <Link to="/" className="inline-flex items-center space-x-3 mb-8 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <PawPrint className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                    PetSpa
                  </span>
                </div>
              </Link>

              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://i0.wp.com/tinformas.com/wp-content/uploads/2022/06/vacunacion-mascotas-elalto.jpg?fit=800%2C600&ssl=1"
                  alt="Mascota feliz en el spa"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Únete a nuestra familia</h2>
                  <p className="text-white/90 text-lg">
                    Más de 1,000 mascotas felices disfrutan de nuestros servicios premium
                  </p>
                  <div className="flex mt-6 space-x-2">
                    <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjXEea4EG-xobr6P9cn8MzEB7dVWg4NsQkNQ&s"
                        alt="Pet 1"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden -ml-4">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRciAqS_Qw1qe7mZw1gg8Jiaymgo_MDLAgBSQ&s"
                        alt="Pet 2"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden -ml-4">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8zEWbJVCd1TD4atHlVmZTvVR8KT7YS0bwHA&s"
                        alt="Pet 3"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-white bg-amber-500 -ml-4 flex items-center justify-center">
                      <span className="text-white font-medium">+997</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-amber-200 max-w-xs">
                <div className="flex items-start space-x-3">
                  <div className="flex text-amber-400">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                  <span className="font-semibold text-gray-800">5.0</span>
                </div>
                <p className="mt-2 text-gray-600 text-sm italic">
                  "Mi mascota adora PetSpa. El mejor servicio y atención que hemos encontrado."
                </p>
                <div className="mt-3 flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                    <img
                      src="/placeholder.svg?height=30&width=30"
                      alt="Cliente"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">María González</p>
                    <p className="text-xs text-gray-500">Cliente desde 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <div>
            <div className="lg:hidden text-center mb-8">
              <Link to="/" className="inline-flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <PawPrint className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                    PetSpa
                  </span>
                </div>
              </Link>
            </div>

            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm relative overflow-hidden">
              {/* Card Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-100 to-amber-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

              <CardHeader className="text-center relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-4 shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">Crear Cuenta</CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  Únete a PetSpa y descubre una experiencia premium para tu mascota
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10">
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    phone: "",
                    address: "",
                    document: "",
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    register(values, {
                      onSuccess: () => {
                        navigate("/login")
                      },
                      onSettled: () => {
                        setSubmitting(false)
                      },
                    })
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-700 font-medium flex items-center">
                            <User className="w-4 h-4 mr-2 text-amber-500" />
                            Nombre Completo
                          </Label>
                          <div className="relative">
                            <InputField
                              id="name"
                              name="name"
                              type="text"
                              placeholder="Tu nombre completo"
                              required
                              className="pl-10 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl bg-white/50"
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-700 font-medium flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-amber-500" />
                            Correo Electrónico
                          </Label>
                          <div className="relative">
                            <InputField
                              id="email"
                              name="email"
                              type="email"
                              placeholder="tu@email.com"
                              required
                              className="pl-10 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl bg-white/50"
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-gray-700 font-medium flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-amber-500" />
                            Teléfono
                          </Label>
                          <div className="relative">
                            <InputField
                              id="phone"
                              name="phone"
                              type="tel"
                              placeholder="(555) 123-4567"
                              required
                              className="pl-10 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl bg-white/50"
                            />
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address" className="text-gray-700 font-medium flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-amber-500" />
                            Dirección
                          </Label>
                          <div className="relative">
                            <InputField
                              id="address"
                              name="address"
                              type="text"
                              placeholder="Tu dirección"
                              required
                              className="pl-10 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl bg-white/50"
                            />
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="document" className="text-gray-700 font-medium flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-amber-500" />
                          Documento de Identidad
                        </Label>
                        <div className="relative">
                          <InputField
                            id="document"
                            name="document"
                            type="text"
                            placeholder="Número de documento"
                            required
                            className="pl-10 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl bg-white/50"
                          />
                          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-gray-700 font-medium flex items-center">
                            <Lock className="w-4 h-4 mr-2 text-amber-500" />
                            Contraseña
                          </Label>
                          <div className="relative">
                            <InputField
                              id="password"
                              name="password"
                              type="password"
                              placeholder="••••••••"
                              required
                              className="pl-10 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl bg-white/50"
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword" className="text-gray-700 font-medium flex items-center">
                            <Lock className="w-4 h-4 mr-2 text-amber-500" />
                            Confirmar Contraseña
                          </Label>
                          <div className="relative">
                            <InputField
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              placeholder="••••••••"
                              required
                              className="pl-10 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl bg-white/50"
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Procesando...
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <Sparkles className="w-5 h-5 mr-2" />
                              Crear Cuenta
                            </div>
                          )}
                        </Button>
                      </div>

                      <div className="mt-6 text-center">
                        <p className="text-gray-600">
                          ¿Ya tienes cuenta?{" "}
                          <Link to="/login" className="text-amber-600 hover:text-amber-700 font-medium">
                            Inicia sesión aquí
                          </Link>
                        </p>
                      </div>

                      <div className="text-center border-t border-amber-100 pt-4">
                        <Link
                          to="/"
                          className="inline-flex items-center text-gray-600 hover:text-amber-600 font-medium transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Volver al inicio
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function Star() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  )
}

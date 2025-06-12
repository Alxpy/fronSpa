import { Link, useNavigate } from "react-router-dom"
import { useLogin } from "@/hook/auth"
import { Formik, Form, ErrorMessage } from "formik"
import * as Yup from "yup"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { PawPrint, Mail, Lock, ArrowLeft, Sparkles } from "lucide-react"
import InputField from "@/components/field/InputField"

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Correo electrónico inválido").required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
})

export default function LoginPage() {
  const { mutate: login } = useLogin()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-orange-200 rounded-full opacity-40 animate-bounce"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-yellow-200 rounded-full opacity-30"></div>
      <div className="absolute bottom-32 right-10 w-12 h-12 bg-amber-300 rounded-full opacity-60 animate-pulse"></div>

      {/* Floating Paw Prints */}
      <div className="absolute top-1/4 left-1/4 text-amber-200 opacity-20 animate-float">
        <PawPrint className="w-8 h-8" />
      </div>
      <div
        className="absolute top-3/4 right-1/4 text-orange-200 opacity-20 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <PawPrint className="w-6 h-6" />
      </div>
      <div
        className="absolute top-1/2 right-1/3 text-yellow-200 opacity-20 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <PawPrint className="w-10 h-10" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                <PawPrint className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                PetSpa
              </span>
              <div className="flex items-center justify-center mt-1">
                <Sparkles className="w-4 h-4 text-amber-500 mr-1" />
                <span className="text-sm text-amber-600 font-medium">Premium Pet Care</span>
                <Sparkles className="w-4 h-4 text-amber-500 ml-1" />
              </div>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm relative overflow-hidden">
          {/* Card Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-100 to-amber-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

          <CardHeader className="text-center relative z-10 pb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-4 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">¡Bienvenido de vuelta!</CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Ingresa a tu cuenta para acceder a nuestros servicios premium
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10">
            <Formik
              initialValues={{ email: "milton@gmail.com", password: "1234567" }}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting }) => {
                login(values, {
                  onSuccess: () => {
                    navigate("/dashboard")
                  },
                  onSettled: () => {
                    setSubmitting(false)
                  },
                })
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div className="space-y-3">
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
                        className="pl-12 h-12 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 w-full rounded-xl bg-white/50 backdrop-blur-sm"
                      />
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm font-medium flex items-center"
                    />
                  </div>

                  <div className="space-y-3">
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
                        className="pl-12 h-12 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 w-full rounded-xl bg-white/50 backdrop-blur-sm"
                      />
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm font-medium flex items-center"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Iniciando...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <PawPrint className="w-5 h-5 mr-2" />
                        Iniciar Sesión
                      </div>
                    )}
                  </Button>
                </Form>
              )}
            </Formik>

            {/* Links Section */}
            <div className="mt-8 space-y-4">
              <div className="text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-amber-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">¿Nuevo en PetSpa?</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 text-amber-600 hover:text-amber-700 font-semibold bg-amber-50 hover:bg-amber-100 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Regístrate aquí
                </Link>
              </div>

              <div className="text-center pt-4 border-t border-amber-100">
                <Link
                  to="/"
                  className="inline-flex items-center text-gray-600 hover:text-amber-600 font-medium transition-colors duration-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al inicio
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-amber-600">
            <div className="flex items-center">
              <PawPrint className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Seguro</span>
            </div>
            <div className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Confiable</span>
            </div>
            <div className="flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Privado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

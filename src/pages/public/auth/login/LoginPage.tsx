import { Link, useNavigate } from "react-router-dom"
import { useLogin } from "@/hook/auth"
import { Formik, Form, ErrorMessage } from "formik"
import * as Yup from "yup"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Heart } from "lucide-react"
import InputField from "@/components/field/InputField"

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
})

export default function LoginPage() {

  const { mutate: login } = useLogin()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <Heart className="w-10 h-10 text-blue-600" />
            <span className="text-3xl font-bold text-blue-900">PetSpa</span>
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-blue-900">Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingresa a tu cuenta para acceder a nuestros servicios
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                  }
                })
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <InputField
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <InputField
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
                  </Button>
                </Form>
              )}
            </Formik>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes cuenta?{" "}
                <Link to="/register" className="text-blue-600 hover:underline font-medium">
                  Regístrate aquí
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link to="/" className="text-sm text-blue-600 hover:underline">
                ← Volver al inicio
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

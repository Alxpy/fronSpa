import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRegister } from "@/hook/auth"
import { Heart } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Form } from "formik"
import InputField from "@/components/field/InputField"

export default function RegisterPage() {
  const { mutate: register } = useRegister()
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
            <CardTitle className="text-2xl text-blue-900">Crear Cuenta</CardTitle>
            <CardDescription>Únete a PetSpa y cuida mejor a tu mascota</CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
                address: "",
                document: ""
              }}
              onSubmit={(values, { setSubmitting }) => {
                register(values, {
                  onSuccess: () => {
                    navigate("/login")
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
                    <Label htmlFor="name">Nombre Completo</Label>
                    <InputField
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <InputField
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <InputField
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <InputField
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Tu dirección"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="document">Documento de Identidad</Label>
                    <InputField
                      id="password"
                      name="document"
                      type="text"
                      placeholder="Número de documento"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <InputField
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <InputField
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Crear Cuenta
                  </Button>
                </Form>
              )}
            </Formik>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">
                  Inicia sesión aquí
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

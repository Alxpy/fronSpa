import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
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
import { ArrowLeft, Clock, DollarSign, Heart, Save, Scissors, Shield, Sparkles, Upload } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useCreateService } from "@/hook/services"

const categoryIcons = {
  belleza: Scissors,
  relajacion: Heart,
  salud: Shield,
  otro: Sparkles,
}

// Esquema de validación con Yup
const serviceSchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  description: Yup.string()
    .required("La descripción es requerida")
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  price: Yup.number()
    .required("El precio es requerido")
    .positive("El precio debe ser positivo")
    .typeError("Debe ser un número válido"),
  duration: Yup.number()
    .required("La duración es requerida")
    .positive("La duración debe ser positiva")
    .integer("La duración debe ser en minutos enteros")
    .typeError("Debe ser un número válido"),
  category: Yup.string()
    .required("La categoría es requerida")
    .oneOf(["belleza", "relajacion", "salud", "otro"], "Categoría no válida"),
  isActive: Yup.boolean().default(true),
  image: Yup.string().url("Debe ser una URL válida").optional()
})

export default function NewServicePage() {
  const { mutate: createService } = useCreateService()
  const navigate = useNavigate()

  const initialValues = {
    name: "",
    description: "",
    price: 0,
    duration: 0,
    category: "",
    isActive: true,
    image: ""
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
              <BreadcrumbLink href="/admin/services">Servicios</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Nuevo Servicio</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Nuevo Servicio</h1>
            <p className="text-blue-600">Agrega un nuevo servicio de spa</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/admin/services">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Link>
          </Button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={serviceSchema}
          onSubmit={(values, { setSubmitting }) => {
            createService(values, {
              onSuccess: () => {
                navigate("/admin/services", { replace: true })
              },
              onSettled: () => {
                setSubmitting(false)
              }
            })
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => {
            const IconComponent = values.category ? categoryIcons[values.category as keyof typeof categoryIcons] : Sparkles
            
            return (
              <Form className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2 space-y-6">
                    <Card className="border-blue-100">
                      <CardHeader>
                        <CardTitle className="text-blue-900">Información del Servicio</CardTitle>
                        <CardDescription>Completa los datos del servicio de spa</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre del Servicio *</Label>
                          <Field
                            as={Input}
                            id="name"
                            name="name"
                            placeholder="Ej: Baño y Corte Premium"
                            className="border-blue-200 focus:border-blue-500"
                          />
                          <ErrorMessage name="name" component="p" className="text-sm text-red-600" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Descripción *</Label>
                          <Field
                            as={Textarea}
                            id="description"
                            name="description"
                            placeholder="Describe en detalle qué incluye este servicio..."
                            className="border-blue-200 focus:border-blue-500 min-h-[120px]"
                          />
                          <ErrorMessage name="description" component="p" className="text-sm text-red-600" />
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="space-y-2">
                            <Label htmlFor="category">Categoría *</Label>
                            <Select 
                              value={values.category} 
                              onValueChange={(value) => setFieldValue("category", value)}
                            >
                              <SelectTrigger className="border-blue-200 focus:border-blue-500">
                                <SelectValue placeholder="Selecciona una categoría" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="belleza">
                                  <div className="flex items-center gap-2">
                                    <Scissors className="w-4 h-4" />
                                    Belleza
                                  </div>
                                </SelectItem>
                                <SelectItem value="relajacion">
                                  <div className="flex items-center gap-2">
                                    <Heart className="w-4 h-4" />
                                    Relajación
                                  </div>
                                </SelectItem>
                                <SelectItem value="salud">
                                  <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    Salud
                                  </div>
                                </SelectItem>
                                <SelectItem value="otro">
                                  <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    Otro
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <ErrorMessage name="category" component="p" className="text-sm text-red-600" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="price">Precio (USD) *</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <Field
                                as={Input}
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="pl-10 border-blue-200 focus:border-blue-500"
                              />
                            </div>
                            <ErrorMessage name="price" component="p" className="text-sm text-red-600" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="duration">Duración (minutos) *</Label>
                            <div className="relative">
                              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <Field
                                as={Input}
                                id="duration"
                                name="duration"
                                type="number"
                                placeholder="60"
                                className="pl-10 border-blue-200 focus:border-blue-500"
                              />
                            </div>
                            <ErrorMessage name="duration" component="p" className="text-sm text-red-600" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="image">URL de la Imagen (Opcional)</Label>
                          <Field
                            as={Input}
                            id="image"
                            name="image"
                            placeholder="https://ejemplo.com/imagen.jpg"
                            className="border-blue-200 focus:border-blue-500"
                          />
                          <ErrorMessage name="image" component="p" className="text-sm text-red-600" />
                        </div>

                        <div className="flex items-center space-x-2 pt-4">
                          <Switch
                            id="isActive"
                            checked={values.isActive}
                            onCheckedChange={(checked) => setFieldValue("isActive", checked)}
                          />
                          <Label htmlFor="isActive">Servicio activo</Label>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card className="border-blue-100">
                      <CardHeader>
                        <CardTitle className="text-blue-900">Vista Previa</CardTitle>
                        <CardDescription>Así se verá tu servicio</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-blue-50 rounded-lg p-4 space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-600 rounded-lg text-white">
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-blue-900">{values.name || "Nombre del servicio"}</h3>
                              {values.category && (
                                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                                  {values.category.charAt(0).toUpperCase() + values.category.slice(1)}
                                </span>
                              )}
                            </div>
                          </div>

                          {values.image ? (
                            <img 
                              src={values.image} 
                              alt="Vista previa del servicio" 
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center">
                              <Upload className="w-8 h-8 text-gray-400" />
                            </div>
                          )}

                          <p className="text-sm text-gray-600">{values.description || "Descripción del servicio"}</p>

                          <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                            <span className="text-lg font-bold text-blue-600">${values.price || "0.00"}</span>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{values.duration || "0"} min</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-100">
                      <CardHeader>
                        <CardTitle className="text-blue-900">Consejos</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <p className="text-gray-600">
                            Usa nombres descriptivos que los clientes puedan entender fácilmente
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <p className="text-gray-600">Incluye todos los detalles importantes en la descripción</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <p className="text-gray-600">
                            Considera el tiempo real que toma el servicio incluyendo preparación
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-blue-100">
                  <Button type="button" variant="outline" asChild>
                    <Link to="/admin/services">Cancelar</Link>
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Guardando..." : "Guardar Servicio"}
                  </Button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </SidebarInset>
  )
}
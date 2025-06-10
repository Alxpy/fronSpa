import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { ArrowLeft, Building2, Mail, MapPin, Phone, Save, Truck } from "lucide-react"
import { useCreateSupplier } from "@/hook/supplier"
import { Link, useNavigate } from "react-router-dom"

// Esquema de validación con Yup
const supplierSchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  description: Yup.string()
    .required("La descripción es requerida")
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  email: Yup.string()
    .email("El email no es válido")
    .required("El email es requerido"),
  address: Yup.string()
    .required("La dirección es requerida")
    .min(10, "La dirección debe ser más específica"),
  phone: Yup.string(),
  isActive: Yup.boolean().default(true)
})

export default function NewSupplierPage() {
  const { mutate: createSupplier } = useCreateSupplier()
  const navigate = useNavigate()

  const initialValues = {
    name: "",
    description: "",
    email: "",
    address: "",
    phone: "",
    isActive: true
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
              <BreadcrumbLink href="/admin/suppliers">Proveedores</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Nuevo Proveedor</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Nuevo Proveedor</h1>
            <p className="text-blue-600">Agrega un nuevo proveedor a tu red de distribuidores</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/admin/suppliers">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Link>
          </Button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={supplierSchema}
          onSubmit={(values, { setSubmitting }) => {
            createSupplier(values, {
              onSettled: () => {
                setSubmitting(false)
              },
              onSuccess: () => {
                navigate("/admin/suppliers")
              }
            })
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border-blue-100">
                    <CardHeader>
                      <CardTitle className="text-blue-900 flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        Información del Proveedor
                      </CardTitle>
                      <CardDescription>Completa los datos básicos del proveedor</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre de la Empresa *</Label>
                        <Field
                          as={Input}
                          id="name"
                          name="name"
                          placeholder="Ej: PetFood Distribuidores S.A."
                          className="border-blue-200 focus:border-blue-500"
                        />
                        <ErrorMessage name="name" component="p" className="text-sm text-red-600" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Descripción del Negocio *</Label>
                        <Field
                          as={Textarea}
                          id="description"
                          name="description"
                          placeholder="Describe el tipo de productos o servicios que ofrece este proveedor..."
                          className="border-blue-200 focus:border-blue-500 min-h-[100px]"
                        />
                        <ErrorMessage name="description" component="p" className="text-sm text-red-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-100">
                    <CardHeader>
                      <CardTitle className="text-blue-900 flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Información de Contacto
                      </CardTitle>
                      <CardDescription>Datos para comunicarse con el proveedor</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Corporativo *</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Field
                              as={Input}
                              id="email"
                              type="email"
                              name="email"
                              placeholder="contacto@empresa.com"
                              className="pl-10 border-blue-200 focus:border-blue-500"
                            />
                          </div>
                          <ErrorMessage name="email" component="p" className="text-sm text-red-600" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Teléfono (Opcional)</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Field
                              as={Input}
                              id="phone"
                              type="tel"
                              name="phone"
                              placeholder="(555) 123-4567"
                              className="pl-10 border-blue-200 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Dirección *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                          <Field
                            as={Textarea}
                            id="address"
                            name="address"
                            placeholder="Dirección completa de la empresa..."
                            className="pl-10 border-blue-200 focus:border-blue-500 min-h-[80px]"
                          />
                        </div>
                        <ErrorMessage name="address" component="p" className="text-sm text-red-600" />
                      </div>

                      <div className="flex items-center space-x-2 pt-4">
                        <Switch
                          id="isActive"
                          checked={values.isActive}
                          onCheckedChange={(checked) => setFieldValue("isActive", checked)}
                        />
                        <Label htmlFor="isActive">Proveedor activo</Label>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="border-blue-100">
                    <CardHeader>
                      <CardTitle className="text-blue-900">Vista Previa</CardTitle>
                      <CardDescription>Así se verá el proveedor</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-blue-50 rounded-lg p-4 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-blue-600 rounded-lg text-white">
                            <Truck className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-blue-900">{values.name || "Nombre del proveedor"}</h3>
                            <span
                              className={`text-xs px-2 py-1 rounded ${values.isActive ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}
                            >
                              {values.isActive ? "Activo" : "Inactivo"}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600">{values.description || "Descripción del proveedor"}</p>

                        <div className="space-y-2 pt-2 border-t border-blue-200">
                          {values.email && (
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-4 h-4 text-blue-600" />
                              <span className="text-blue-600">{values.email}</span>
                            </div>
                          )}
                          {values.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span>{values.phone}</span>
                            </div>
                          )}
                          {values.address && (
                            <div className="flex items-start gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                              <span className="text-gray-600">{values.address}</span>
                            </div>
                          )}
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
                          Asegúrate de que el email sea válido para recibir comunicaciones importantes
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <p className="text-gray-600">
                          Una descripción detallada ayuda a identificar rápidamente el tipo de proveedor
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <p className="text-gray-600">Incluye la dirección completa para facilitar entregas y visitas</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-blue-100">
                <Button type="button" variant="outline" asChild>
                  <Link to="/admin/suppliers">Cancelar</Link>
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Guardando..." : "Guardar Proveedor"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </SidebarInset>
  )
}
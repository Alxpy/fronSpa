import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { ArrowLeft, Save, Upload } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useCreateProduct } from "@/hook/products"
import { useGetSuppliers } from "@/hook/supplier"

// Esquema de validación con Yup
const productSchema = Yup.object().shape({
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
  category: Yup.string()
    .required("La categoría es requerida"),
  stock: Yup.number()
    .required("El stock es requerido")
    .integer("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo")
    .typeError("Debe ser un número válido"),
})

export default function NewProductPage() {
  const { mutate: createProduct } = useCreateProduct()
  const { data: suppliers, isLoading } = useGetSuppliers()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <SidebarInset>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Cargando proveedores...</p>
        </div>
      </SidebarInset>
    )
  }

  const initialValues = {
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    supplier: "",
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
              <BreadcrumbLink href="/admin/products">Productos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Nuevo Producto</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Nuevo Producto</h1>
            <p className="text-blue-600">Agrega un nuevo producto al inventario</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/admin/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Link>
          </Button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={productSchema}
          onSubmit={(values, { setSubmitting }) => {
            createProduct(values, {
              onSuccess: () => {
                navigate("/admin/products")
              },
              onSettled: () => {
                setSubmitting(false)
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
                      <CardTitle className="text-blue-900">Información del Producto</CardTitle>
                      <CardDescription>Completa los datos básicos del producto</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre del Producto *</Label>
                          <Field
                            as={Input}
                            id="name"
                            name="name"
                            placeholder="Ej: Alimento Premium para Perros"
                            className="border-blue-200 focus:border-blue-500"
                          />
                          <ErrorMessage name="name" component="p" className="text-sm text-red-600" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Descripción *</Label>
                        <Field
                          as={Textarea}
                          id="description"
                          name="description"
                          placeholder="Describe las características y beneficios del producto..."
                          className="border-blue-200 focus:border-blue-500 min-h-[100px]"
                        />
                        <ErrorMessage name="description" component="p" className="text-sm text-red-600" />
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="category">Provedores *</Label>
                          <Select
                            value={values.supplier}
                            onValueChange={(value) => setFieldValue("supplier", value)}
                          >
                            <SelectTrigger className="border-blue-200 focus:border-blue-500">
                              <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                              {suppliers.map((supplier) => (
                                <SelectItem key={supplier._id} value={supplier._id}>
                                  {supplier.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <ErrorMessage name="category" component="p" className="text-sm text-red-600" />
                        </div>
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
                              <SelectItem value="alimentacion">Alimentación</SelectItem>
                              <SelectItem value="juguetes">Juguetes</SelectItem>
                              <SelectItem value="accesorios">Accesorios</SelectItem>
                              <SelectItem value="cuidado">Cuidado</SelectItem>
                              <SelectItem value="salud">Salud</SelectItem>
                            </SelectContent>
                          </Select>
                          <ErrorMessage name="category" component="p" className="text-sm text-red-600" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price">Precio *</Label>
                          <Field
                            as={Input}
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="border-blue-200 focus:border-blue-500"
                          />
                          <ErrorMessage name="price" component="p" className="text-sm text-red-600" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="stock">Stock Inicial *</Label>
                          <Field
                            as={Input}
                            id="stock"
                            name="stock"
                            type="number"
                            placeholder="0"
                            className="border-blue-200 focus:border-blue-500"
                          />
                          <ErrorMessage name="stock" component="p" className="text-sm text-red-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="border-blue-100">
                    <CardHeader>
                      <CardTitle className="text-blue-900">Imagen del Producto</CardTitle>
                      <CardDescription>Sube una imagen representativa</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-2">Arrastra una imagen aquí o haz clic para seleccionar</p>
                        <p className="text-xs text-gray-500">PNG, JPG hasta 5MB</p>
                        <Button type="button" variant="outline" className="mt-4">
                          Seleccionar Archivo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-100">
                    <CardHeader>
                      <CardTitle className="text-blue-900">Vista Previa</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="bg-gray-200 rounded-lg h-32 mb-3 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">Sin imagen</span>
                        </div>
                        <h3 className="font-semibold text-blue-900 mb-1">{values.name || "Nombre del producto"}</h3>
                        <p className="text-sm text-gray-600 mb-2">{values.description || "Descripción del producto"}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-blue-600">${values.price || "0.00"}</span>
                          <span className="text-sm text-gray-500">Stock: {values.stock || "0"}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-blue-100">
                <Button type="button" variant="outline" asChild>
                  <Link to="/admin/products">Cancelar</Link>
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Guardando..." : "Guardar Producto"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </SidebarInset>
  )
}
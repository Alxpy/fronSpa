"use client"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar/Navbar"
import {
  ArrowLeft,
  Save,
  Upload,
  Package,
  DollarSign,
  Tag,
  Warehouse,
  ImageIcon,
  Sparkles,
  Eye,
  Star,
  Award,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useCreateProduct } from "@/hook/products"
import { useGetSuppliers } from "@/hook/supplier"

// Esquema de validación con Yup
const productSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido").min(3, "El nombre debe tener al menos 3 caracteres"),
  description: Yup.string()
    .required("La descripción es requerida")
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  price: Yup.number()
    .required("El precio es requerido")
    .positive("El precio debe ser positivo")
    .typeError("Debe ser un número válido"),
  category: Yup.string().required("La categoría es requerida"),
  stock: Yup.number()
    .required("El stock es requerido")
    .integer("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo")
    .typeError("Debe ser un número válido"),
})

const categoryIcons: any = {
  alimentacion: "🍖",
  juguetes: "🎾",
  accesorios: "🎀",
  cuidado: "🧴",
  salud: "💊",
}

export default function NewProductPage() {
  const { mutate: createProduct } = useCreateProduct()
  const { data: suppliers, isLoading } = useGetSuppliers()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
            <p className="text-xl text-amber-700 font-medium">Cargando proveedores...</p>
          </div>
        </div>
      </div>
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Navbar />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-orange-200 rounded-full opacity-40 animate-bounce"></div>

      <div className="container mx-auto px-4 py-8 relative">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" asChild className="border-amber-300 text-amber-700 hover:bg-amber-50 shadow-md">
              <Link to="/admin/products">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Productos
              </Link>
            </Button>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Package className="w-4 h-4 mr-2" />
              Gestión de Inventario
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Nuevo{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Producto
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Agrega un nuevo producto premium a nuestro catálogo y expande la experiencia de nuestros clientes
            </p>
          </div>
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
              },
            })
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="space-y-8">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Product Information */}
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl text-gray-900 flex items-center">
                        <Package className="w-6 h-6 mr-2 text-amber-500" />
                        Información del Producto
                      </CardTitle>
                      <CardDescription className="text-base">
                        Completa los datos básicos del producto premium
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-gray-700 font-medium flex items-center">
                          <Tag className="w-4 h-4 mr-2 text-amber-500" />
                          Nombre del Producto *
                        </Label>
                        <Field
                          as={Input}
                          id="name"
                          name="name"
                          placeholder="Ej: Alimento Premium para Perros Golden"
                          className="h-12 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl"
                        />
                        <ErrorMessage name="name" component="p" className="text-sm text-red-600 font-medium" />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="description" className="text-gray-700 font-medium flex items-center">
                          <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
                          Descripción Premium *
                        </Label>
                        <Field
                          as={Textarea}
                          id="description"
                          name="description"
                          placeholder="Describe las características únicas, beneficios y por qué este producto es especial para las mascotas..."
                          className="min-h-[120px] border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl"
                        />
                        <ErrorMessage name="description" component="p" className="text-sm text-red-600 font-medium" />
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                          <Label htmlFor="supplier" className="text-gray-700 font-medium flex items-center">
                            <Award className="w-4 h-4 mr-2 text-amber-500" />
                            Proveedor Premium *
                          </Label>
                          <Select value={values.supplier} onValueChange={(value) => setFieldValue("supplier", value)}>
                            <SelectTrigger className="h-12 border-2 border-amber-200 focus:border-amber-400 rounded-xl">
                              <SelectValue placeholder="Selecciona un proveedor" />
                            </SelectTrigger>
                            <SelectContent>
                              {suppliers.map((supplier) => (
                                <SelectItem key={supplier._id} value={supplier._id}>
                                  <div className="flex items-center">
                                    <Award className="w-4 h-4 mr-2 text-amber-500" />
                                    {supplier.name}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <ErrorMessage name="supplier" component="p" className="text-sm text-red-600 font-medium" />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="category" className="text-gray-700 font-medium flex items-center">
                            <Tag className="w-4 h-4 mr-2 text-amber-500" />
                            Categoría *
                          </Label>
                          <Select value={values.category} onValueChange={(value) => setFieldValue("category", value)}>
                            <SelectTrigger className="h-12 border-2 border-amber-200 focus:border-amber-400 rounded-xl">
                              <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="alimentacion">
                                {categoryIcons.alimentacion} Alimentación Premium
                              </SelectItem>
                              <SelectItem value="juguetes">{categoryIcons.juguetes} Juguetes Interactivos</SelectItem>
                              <SelectItem value="accesorios">{categoryIcons.accesorios} Accesorios de Lujo</SelectItem>
                              <SelectItem value="cuidado">{categoryIcons.cuidado} Productos de Cuidado</SelectItem>
                              <SelectItem value="salud">{categoryIcons.salud} Salud y Bienestar</SelectItem>
                            </SelectContent>
                          </Select>
                          <ErrorMessage name="category" component="p" className="text-sm text-red-600 font-medium" />
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                          <Label htmlFor="price" className="text-gray-700 font-medium flex items-center">
                            <DollarSign className="w-4 h-4 mr-2 text-amber-500" />
                            Precio Premium *
                          </Label>
                          <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                            <Field
                              as={Input}
                              id="price"
                              name="price"
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="pl-12 h-12 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl"
                            />
                          </div>
                          <ErrorMessage name="price" component="p" className="text-sm text-red-600 font-medium" />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="stock" className="text-gray-700 font-medium flex items-center">
                            <Warehouse className="w-4 h-4 mr-2 text-amber-500" />
                            Stock Inicial *
                          </Label>
                          <div className="relative">
                            <Warehouse className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                            <Field
                              as={Input}
                              id="stock"
                              name="stock"
                              type="number"
                              placeholder="0"
                              className="pl-12 h-12 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl"
                            />
                          </div>
                          <ErrorMessage name="stock" component="p" className="text-sm text-red-600 font-medium" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Image Upload */}
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-900 flex items-center">
                        <ImageIcon className="w-5 h-5 mr-2 text-amber-500" />
                        Imagen Premium
                      </CardTitle>
                      <CardDescription>Sube una imagen de alta calidad del producto</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-amber-300 rounded-xl p-8 text-center hover:border-amber-400 transition-colors bg-amber-50/50">
                        <Upload className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-2 font-medium">
                          Arrastra una imagen aquí o haz clic para seleccionar
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          PNG, JPG hasta 5MB • Resolución recomendada: 800x600
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          className="border-amber-300 text-amber-700 hover:bg-amber-50"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Seleccionar Archivo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Preview */}
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-900 flex items-center">
                        <Eye className="w-5 h-5 mr-2 text-amber-500" />
                        Vista Previa
                      </CardTitle>
                      <CardDescription>Así se verá tu producto en la tienda</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                        <div className="bg-gray-200 rounded-xl h-40 mb-4 flex items-center justify-center relative overflow-hidden">
                          <span className="text-gray-500 text-sm">Sin imagen</span>
                          <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            ✨ Premium
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h3 className="font-bold text-gray-900 line-clamp-2">
                              {values.name || "Nombre del producto"}
                            </h3>
                            <div className="flex text-amber-400 ml-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                          </div>

                          {values.category && (
                            <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200">
                              {categoryIcons[values.category]} {values.category}
                            </Badge>
                          )}

                          <p className="text-sm text-gray-600 line-clamp-3">
                            {values.description || "Descripción del producto aparecerá aquí..."}
                          </p>

                          <div className="flex justify-between items-center pt-2 border-t border-amber-200">
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                              ${values.price || "0.00"}
                            </span>
                            <div className="text-right">
                              <div className="flex items-center text-sm text-gray-500">
                                <Warehouse className="w-3 h-3 mr-1" />
                                Stock: {values.stock || "0"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <Card className="border-0 shadow-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Sparkles className="w-8 h-8 mx-auto mb-3" />
                        <h3 className="font-bold text-lg mb-2">Producto Premium</h3>
                        <p className="text-white/90 text-sm">
                          Este producto se agregará a nuestro catálogo premium con garantía de calidad
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-6 pt-8 border-t border-amber-200">
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="border-amber-300 text-amber-700 hover:bg-amber-50 h-12 px-8"
                >
                  <Link to="/admin/products">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Cancelar
                  </Link>
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-12 px-8"
                  disabled={isSubmitting}
                >
                  <Save className="w-5 h-5 mr-2" />
                  {isSubmitting ? "Guardando..." : "Guardar Producto Premium"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

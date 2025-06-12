"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar/Navbar"
import { Search, ShoppingCart, Star, Heart, Sparkles, Award, Truck, Shield, Filter } from "lucide-react"
import { useState } from "react"
import { useAddToCart, useGetProducts } from "@/hook/products"
import { useProfile } from "@/hook/auth"

export default function ProductsPage() {
  const { data: products, isLoading } = useGetProducts()
  const { mutate: addToCart } = useAddToCart()
  const { data: profile } = useProfile()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [favorites, setFavorites] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("name")

  const categories = ["all", "Alimentación", "Juguetes", "Accesorios", "Cuidado"]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
            <p className="text-xl text-amber-700 font-medium">Cargando productos premium...</p>
          </div>
        </div>
      </div>
    )
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
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
            Productos Premium para Mascotas
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Todo para tu{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              mascota feliz
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra colección curada de productos premium diseñados para el bienestar y felicidad de tu
            compañero peludo
          </p>
        </div>

        {/* Filtros y búsqueda */}
        <div className="mb-10">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Filter className="w-5 h-5 text-amber-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Filtros de Búsqueda</h3>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
                  <Input
                    placeholder="Buscar productos premium..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl bg-white/50"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-56 h-12 border-2 border-amber-200 focus:border-amber-400 rounded-xl bg-white/50">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "🏷️ Todas las categorías" : `${getCategoryIcon(category)} ${category}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-56 h-12 border-2 border-amber-200 focus:border-amber-400 rounded-xl bg-white/50">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">📝 Nombre A-Z</SelectItem>
                    <SelectItem value="price-low">💰 Precio: Menor a Mayor</SelectItem>
                    <SelectItem value="price-high">💎 Precio: Mayor a Menor</SelectItem>
                    <SelectItem value="rating">⭐ Mejor Valorados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grid de productos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <Card
              key={product._id}
              className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden bg-white/80 backdrop-blur-sm transform hover:-translate-y-2"
            >
              <CardHeader className="p-0 relative">
                <div className="relative overflow-hidden">
                  <img
                    src={
                      product.imageUrl ||
                      "https://nupec.com/wp-content/uploads/2021/02/Captura-de-pantalla-2021-02-08-a-las-13.59.48.png" ||
                      "/placeholder.svg"
                    }
                    alt={product.name}
                    width={300}
                    height={250}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-lg rounded-full w-10 h-10 p-0"
                    onClick={() => toggleFavorite(product._id)}
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        favorites.includes(product._id) ? "text-red-500 fill-current" : "text-gray-500"
                      }`}
                    />
                  </Button>

                  {product.stock <= 10 && product.stock > 0 && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg">
                      ⚡ ¡Últimas unidades!
                    </Badge>
                  )}
                  {product.stock === 0 && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg">
                      ❌ Agotado
                    </Badge>
                  )}

                  {/* Premium Badge */}
                  <div className="absolute bottom-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    ✨ Premium
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200"
                  >
                    {getCategoryIcon(product.category)} {product.category}
                  </Badge>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>

                <CardTitle className="text-xl text-gray-900 line-clamp-2 group-hover:text-amber-700 transition-colors leading-tight">
                  {product.name}
                </CardTitle>

                <CardDescription className="text-gray-600 line-clamp-3 leading-relaxed">
                  {product.description}
                </CardDescription>

                <div className="flex justify-between items-center pt-2 border-t border-amber-100">
                  <div>
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                      ${product.price}
                    </span>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Stock: {product.stock} unidades
                    </p>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none h-12"
                  onClick={() => addToCart(product._id)}
                  disabled={product.stock === 0 || !profile}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.stock === 0 ? "Sin Stock" : "Agregar al Carrito"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Search className="w-16 h-16 text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600 mb-6">Intenta con otros términos de búsqueda o cambia los filtros</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              Limpiar filtros
            </Button>
          </div>
        )}

        {/* Promotional Section */}
        <div className="mt-20 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>

          <div className="relative">
            <h2 className="text-4xl font-bold mb-8 text-center">¿Por qué elegir nuestros productos?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Calidad Premium</h3>
                <p className="text-white/90 leading-relaxed">
                  Productos de la más alta calidad, seleccionados especialmente para el bienestar de tu mascota
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Truck className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Envío Express</h3>
                <p className="text-white/90 leading-relaxed">
                  Entrega en 24-48 horas para que tu mascota no tenga que esperar por sus productos favoritos
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Garantía Total</h3>
                <p className="text-white/90 leading-relaxed">
                  100% de satisfacción garantizada o te devolvemos tu dinero. Tu mascota merece lo mejor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    Alimentación: "🍖",
    Juguetes: "🎾",
    Accesorios: "🎀",
    Cuidado: "🧴",
  }
  return icons[category] || "📦"
}

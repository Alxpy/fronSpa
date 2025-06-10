import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar/Navbar"
import { Search, ShoppingCart, Star, Heart } from "lucide-react"
import { useState } from "react"
import { useAddToCart, useGetProducts } from "@/hook/products"
import { useProfile } from "@/hook/auth"

export default function ProductsPage() {

  const { data: products, isLoading } = useGetProducts()
  const { mutate: addToCart } = useAddToCart()
  const { data: profile } = useProfile()

  if (isLoading) {
    return <div className="text-center py-12">Cargando productos...</div>
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [favorites, setFavorites] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("name")

  const categories = ["all", "Alimentación", "Juguetes", "Accesorios", "Cuidado"]

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Productos para Mascotas</h1>
          <p className="text-xl text-gray-600">Encuentra todo lo que necesitas para el cuidado de tu mascota</p>
        </div>

        {/* Filtros y búsqueda */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-blue-200 focus:border-blue-500"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 border-blue-200">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "Todas las categorías" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 border-blue-200">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre A-Z</SelectItem>
                <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="rating">Mejor Valorados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Card
              key={product._id}
              className="group hover:shadow-xl transition-all duration-300 border-blue-100 overflow-hidden"
            >
              <CardHeader className="p-0 relative">
                <div className="relative overflow-hidden">
                  <img
                    src={product.imageUrl || "https://nupec.com/wp-content/uploads/2021/02/Captura-de-pantalla-2021-02-08-a-las-13.59.48.png"}
                    alt={product.name}
                    width={300}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => toggleFavorite(product._id)}
                  >
                    <Heart
                      className={`w-4 h-4 ${favorites.includes(product._id) ? "text-red-500 fill-current" : "text-gray-500"}`}
                    />
                  </Button>
                  {product.stock <= 10 && product.stock > 0 && (
                    <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">¡Últimas unidades!</Badge>
                  )}
                  {product.stock === 0 && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">Agotado</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                    {product.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {/* {renderStars(product.rating)} */}
                    {/* <span className="text-sm text-gray-500 ml-1">({product.reviews})</span> */}
                  </div>
                </div>

                <CardTitle className="text-lg text-blue-900 line-clamp-2 group-hover:text-blue-700 transition-colors">
                  {product.name}
                </CardTitle>

                <CardDescription className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </CardDescription>

                <div className="flex justify-between items-center pt-2">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <p className="text-xs text-gray-500">Stock: {product.stock} unidades</p>
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
                  onClick={() => addToCart(product._id)}
                  disabled={product.stock === 0 || !profile}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.stock === 0 ? "Sin Stock" : "Agregar al Carrito"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-blue-400" />
            </div>
            <p className="text-xl text-gray-500 mb-2">No se encontraron productos</p>
            <p className="text-gray-400">Intenta con otros términos de búsqueda o cambia los filtros</p>
          </div>
        )}

        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">¿Por qué elegir nuestros productos?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2 text-blue-900">Calidad Premium</h3>
              <p className="text-gray-600">
                Productos de la más alta calidad, seleccionados especialmente para tu mascota
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2 text-blue-900">Envío Rápido</h3>
              <p className="text-gray-600">Entrega en 24-48 horas para que tu mascota no espere</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2 text-blue-900">Garantía Total</h3>
              <p className="text-gray-600">100% de satisfacción garantizada o te devolvemos tu dinero</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

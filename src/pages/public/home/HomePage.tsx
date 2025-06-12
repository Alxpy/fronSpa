"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PawPrint, Shield, Star, Users, Sparkles, Heart, Phone, Mail, MapPin } from "lucide-react"
import { Navbar } from "@/components/navbar/Navbar"
import { Link } from "react-router-dom"

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              ¡Bienvenido al paraíso de tu mascota!
            </div>
            <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
              El{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                spa premium
              </span>{" "}
              que tu mascota merece
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Transformamos el cuidado de tu mascota en una experiencia única. Servicios profesionales, productos
              premium y mucho amor en cada visita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/services" className="flex items-center">
                  <PawPrint className="w-5 h-5 mr-2" />
                  Explorar Servicios
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-amber-400 text-amber-700 hover:bg-amber-50 shadow-md"
              >
                <Link to="/products">Ver Productos</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl transform rotate-6 opacity-20"></div>
            <img
              src="https://pharmadiet.com/wp-content/uploads/2021/05/240411-post-blog-piel-sana-mascotas-1.png"
              alt="Mascota feliz en el spa"
              width={600}
              height={500}
              className="relative rounded-3xl shadow-2xl border-4 border-white"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-amber-200">
              <div className="flex items-center space-x-2">
                <Heart className="w-6 h-6 text-red-500" />
                <span className="font-semibold text-gray-800">+1000 mascotas felices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Lo que nos hace especiales
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">¿Por qué elegir PetSpa?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combinamos experiencia, tecnología y amor para brindar el mejor cuidado a tu compañero peludo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-pink-50 to-rose-50">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Cuidado Amoroso</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Cada mascota recibe atención personalizada con todo el amor y cariño que se merece
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Seguridad Total</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Instalaciones certificadas y personal especializado garantizan la máxima seguridad
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-amber-50 to-yellow-50">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Calidad Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Solo utilizamos productos de primera calidad y técnicas innovadoras
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Experiencia</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Más de 10 años creando momentos especiales para mascotas y sus familias
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-white text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-md">
              <Sparkles className="w-4 h-4 mr-2" />
              Servicios exclusivos
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Nuestros Servicios</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experiencias únicas diseñadas para el bienestar y felicidad de tu mascota
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXfzz1mOrFmeOB5_0srbIblGnyJnh2LxI4AQ&s"
                  alt="Servicio de belleza"
                  width={400}
                  height={250}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Belleza & Estética</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Transformación completa con corte profesional, baño aromático, pedicura y tratamientos de belleza que
                  harán brillar a tu mascota.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT06zArLG1jp7C2ozPlfK61EgLutfFAWaHClA&s"
                  alt="Servicio de relajación"
                  width={400}
                  height={250}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Relajación & Bienestar</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Sesiones de masajes terapéuticos, aromaterapia y tratamientos de relajación para el equilibrio físico
                  y emocional.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ6TQyUWGa3Cy1FM97260M5IGkPb0KPfn5eA&s"
                  alt="Servicio de salud"
                  width={400}
                  height={250}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Cuidado de Salud</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Revisiones preventivas, limpieza dental profesional y cuidados especializados para mantener la salud
                  óptima.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/services" className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Descubrir Todos los Servicios
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6">¿Listo para mimar a tu mascota?</h2>
            <p className="text-2xl mb-12 opacity-90">
              Únete a nuestra familia y descubre por qué somos el spa favorito de las mascotas más felices
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-amber-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/register" className="flex items-center">
                  <PawPrint className="w-5 h-5 mr-2" />
                  Registrarse Ahora
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-amber-600 shadow-xl"
              >
                <Link to="/login">Iniciar Sesión</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full"></div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <PawPrint className="w-8 h-8 text-amber-400" />
                <h3 className="text-2xl font-bold">PetSpa</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Creando momentos especiales para mascotas y sus familias desde 2014
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">
                  <Star className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-amber-400">Servicios</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Belleza & Estética</li>
                <li className="hover:text-white transition-colors cursor-pointer">Relajación & Bienestar</li>
                <li className="hover:text-white transition-colors cursor-pointer">Cuidado de Salud</li>
                <li className="hover:text-white transition-colors cursor-pointer">Servicios Premium</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-amber-400">Productos</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Alimentación Premium</li>
                <li className="hover:text-white transition-colors cursor-pointer">Juguetes Interactivos</li>
                <li className="hover:text-white transition-colors cursor-pointer">Accesorios de Lujo</li>
                <li className="hover:text-white transition-colors cursor-pointer">Productos de Cuidado</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-amber-400">Contacto</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-amber-400" />
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-amber-400" />
                  <span>info@petspa.com</span>
                </li>
                <li className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span>Calle Principal 123</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 PetSpa. Todos los derechos reservados. Hecho con ❤️ para las mascotas más felices.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage

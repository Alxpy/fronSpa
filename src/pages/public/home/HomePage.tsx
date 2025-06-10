import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Star, Users } from "lucide-react"
import { Navbar } from "@/components/navbar/Navbar"
import { Link } from "react-router-dom"

function HomePage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              El mejor <span className="text-blue-600">spa para mascotas</span> de la ciudad
            </h1>
            <p className="text-xl text-gray-600">
              Cuidamos a tu mascota con amor y profesionalismo. Servicios de belleza, relajación y productos de calidad.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link to="/services">Ver Servicios</Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link to="/products">Productos</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=500&width=600"
              alt="Mascota feliz en el spa"
              width={600}
              height={500}
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir PetSpa?</h2>
            <p className="text-xl text-gray-600">Ofrecemos la mejor experiencia para tu mascota</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-900">Cuidado Amoroso</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Tratamos a cada mascota con el amor y cuidado que se merece</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-900">Seguridad Total</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Instalaciones seguras y personal altamente capacitado</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-900">Calidad Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Productos y servicios de la más alta calidad</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-900">Experiencia</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Más de 10 años cuidando mascotas felices</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-gray-600">Todo lo que tu mascota necesita en un solo lugar</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Servicio de belleza"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4"
                />
                <CardTitle className="text-blue-900">Belleza y Estética</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Corte, baño, pedicura y tratamientos de belleza para que tu mascota luzca espectacular.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Servicio de relajación"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4"
                />
                <CardTitle className="text-blue-900">Relajación y Bienestar</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Masajes terapéuticos y tratamientos de relajación para el bienestar de tu mascota.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Servicio de salud"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4"
                />
                <CardTitle className="text-blue-900">Cuidado de Salud</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Revisiones básicas, limpieza dental y cuidados preventivos para la salud.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/services">Ver Todos los Servicios</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">¿Listo para consentir a tu mascota?</h2>
          <p className="text-xl mb-8">Regístrate hoy y agenda tu primera cita</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Link to="/register">Registrarse</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              <Link to="/login">Iniciar Sesión</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PetSpa</h3>
              <p className="text-gray-400">El mejor cuidado para tu mascota</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Belleza</li>
                <li>Relajación</li>
                <li>Salud</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Productos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Alimentación</li>
                <li>Juguetes</li>
                <li>Accesorios</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Tel: (555) 123-4567</li>
                <li>Email: info@petspa.com</li>
                <li>Dirección: Calle Principal 123</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PetSpa. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
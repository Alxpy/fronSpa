import { Button } from "@/components/ui/button"
import { useProfile } from "@/hook/auth"
import { Heart, Menu, X } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Cart from "../card/Cart"

export function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  const { data: profile } = useProfile()

  return (
    <nav className="bg-white shadow-sm border-b border-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">PetSpa</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
              Servicios
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
              Productos
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            {profile ? <div>
              <img src="placeholder.svg" alt="User Avatar" className="w-8 h-8 rounded-full inline-block mr-2" />
              <span className="text-gray-700">Hola,</span>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                {profile.name}
              </Link>
            </div> : <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/login">Iniciar Sesión</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link to="/register">Registrarse</Link>
              </Button>
            </div>}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              {profile && <Cart />}
            </div>
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link to="/services" className="block text-gray-700 hover:text-blue-600">
              Servicios
            </Link>
            <Link to="/products" className="block text-gray-700 hover:text-blue-600">
              Productos
            </Link>
            <Link to="/dashboard" className="block text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" asChild>
                <Link to="/login">Iniciar Sesión</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link to="/register">Registrarse</Link>
              </Button>
            </div>
          </div>
        )}

        {profile && <Cart />}
      </div>
    </nav>
  )
}

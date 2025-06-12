"use client"

import { Button } from "@/components/ui/button"
import { useProfile } from "@/hook/auth"
import { PawPrint, Menu, X } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Cart from "../card/Cart"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: profile } = useProfile()

  return (
    <nav className="bg-white shadow-md border-b border-amber-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <PawPrint className="w-8 h-8 text-amber-500" />
            <span className="text-2xl font-bold text-amber-800">PetSpa</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              Servicios
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              Productos
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              Dashboard
            </Link>
            {profile ? (
              <div className="flex items-center bg-amber-50 rounded-full px-4 py-1.5 border border-amber-200">
                <img
                  src="placeholder.svg"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full inline-block mr-2 border-2 border-amber-300"
                />
                <span className="text-gray-700">Hola,</span>
                <Link
                  to="/dashboard"
                  className="ml-1 text-amber-700 font-medium hover:text-amber-800 transition-colors"
                >
                  {profile.name}
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="border-amber-400 text-amber-700 hover:bg-amber-50" asChild>
                  <Link to="/login">Iniciar Sesión</Link>
                </Button>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white" asChild>
                  <Link to="/register">Registrarse</Link>
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">{profile && <Cart />}</div>
            <button
              className="md:hidden p-2 rounded-full hover:bg-amber-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6 text-amber-700" /> : <Menu className="w-6 h-6 text-amber-700" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4 bg-amber-50 rounded-lg mb-4 px-4">
            <Link to="/services" className="block text-gray-700 hover:text-amber-600 py-2 border-b border-amber-200">
              Servicios
            </Link>
            <Link to="/products" className="block text-gray-700 hover:text-amber-600 py-2 border-b border-amber-200">
              Productos
            </Link>
            <Link to="/dashboard" className="block text-gray-700 hover:text-amber-600 py-2 border-b border-amber-200">
              Dashboard
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" className="border-amber-400 text-amber-700 hover:bg-amber-100" asChild>
                <Link to="/login">Iniciar Sesión</Link>
              </Button>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white" asChild>
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

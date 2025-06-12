"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BarChart3,
  Calendar,
  ChevronUp,
  PawPrint,
  Home,
  Package,
  Sparkles,
  Users,
  LogOut,
  Crown,
  Shield,
  TrendingUp,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useLogout } from "@/hook/auth"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    description: "Panel principal",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Productos",
    url: "/admin/products",
    icon: Package,
    description: "Gestionar productos",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Servicios",
    url: "/admin/services",
    icon: Sparkles,
    description: "Servicios premium",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Proveedores",
    url: "/admin/suppliers",
    icon: Package,
    description: "Red de proveedores",
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Usuarios",
    url: "/admin/users",
    icon: Users,
    description: "Comunidad PetSpa",
    color: "from-indigo-500 to-purple-600",
  },
  {
    title: "Citas",
    url: "/admin/appointments",
    icon: Calendar,
    description: "Programación",
    color: "from-rose-500 to-pink-600",
  },
  {
    title: "Reportes",
    url: "/admin/reports",
    icon: BarChart3,
    description: "Análisis y métricas",
    color: "from-teal-500 to-cyan-600",
  },
]

export function AdminSidebar() {
  const navigate = useNavigate()
  const { mutate: logout } = useLogout()

  return (
    <Sidebar variant="inset" className="border-r-0 bg-gradient-to-b from-amber-50 to-orange-50">
      <SidebarHeader className="border-b border-amber-200/50">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl blur-sm opacity-50"></div>
            <div className="relative flex aspect-square size-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
              <PawPrint className="size-6" />
            </div>
          </div>
          <div className="grid flex-1 text-left leading-tight">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                PetSpa
              </span>
              <Crown className="size-4 text-amber-500" />
            </div>
            <div className="flex items-center gap-1">
              <Shield className="size-3 text-amber-600" />
              <span className="text-sm text-amber-700 font-medium">Panel de Control</span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-amber-700 font-semibold text-sm mb-3 px-2 flex items-center">
            <Sparkles className="size-4 mr-2" />
            Gestión Premium
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group relative overflow-hidden rounded-xl border-0 bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105 p-3 h-auto"
                  >
                    <Link to={item.url}>
                      <div className="flex items-center gap-3 w-full">
                        <div
                          className={`flex items-center justify-center size-10 rounded-lg bg-gradient-to-r ${item.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
                        >
                          <item.icon className="size-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-500 group-hover:text-amber-600 transition-colors">
                            {item.description}
                          </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        </div>
                      </div>
                      {/* Hover gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats */}
        <div className="mt-6 px-2">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium opacity-90">Rendimiento Hoy</span>
                <TrendingUp className="size-4 opacity-80" />
              </div>
              <div className="text-2xl font-bold">+24%</div>
              <div className="text-xs opacity-80">Comparado con ayer</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 px-2">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-amber-200">
            <h4 className="text-sm font-semibold text-amber-700 mb-3 flex items-center">
              <Sparkles className="size-4 mr-2" />
              Acciones Rápidas
            </h4>
            <div className="space-y-2">
              <button className="w-full text-left text-sm text-gray-600 hover:text-amber-600 transition-colors p-2 rounded-lg hover:bg-amber-50">
                + Nueva cita
              </button>
              <button className="w-full text-left text-sm text-gray-600 hover:text-amber-600 transition-colors p-2 rounded-lg hover:bg-amber-50">
                + Agregar producto
              </button>
              <button className="w-full text-left text-sm text-gray-600 hover:text-amber-600 transition-colors p-2 rounded-lg hover:bg-amber-50">
                📊 Ver reportes
              </button>
            </div>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-amber-200/50 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="group relative overflow-hidden rounded-xl bg-white/60 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300 data-[state=open]:bg-white data-[state=open]:shadow-lg border border-amber-200 p-3"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg blur-sm opacity-50"></div>
                      <Avatar className="relative h-10 w-10 rounded-lg border-2 border-white shadow-md">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                        <AvatarFallback className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold">
                          AD
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-semibold text-gray-900">Admin</span>
                        <Crown className="size-3 text-amber-500" />
                      </div>
                      <span className="truncate text-xs text-amber-600">admin@petspa.com</span>
                    </div>
                    <ChevronUp className="ml-auto size-4 text-amber-600 group-hover:text-amber-700 transition-colors" />
                  </div>
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl border-amber-200 bg-white/95 backdrop-blur-sm shadow-xl"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem
                  onClick={() => navigate("/")}
                  className="rounded-lg hover:bg-amber-50 hover:text-amber-700 transition-colors cursor-pointer"
                >
                  <Home className="size-4 mr-3 text-amber-500" />
                  <div>
                    <div className="font-medium">Volver a Inicio</div>
                    <div className="text-xs text-gray-500">Página principal</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/my-pets")}
                  className="rounded-lg hover:bg-amber-50 hover:text-amber-700 transition-colors cursor-pointer"
                >
                  <PawPrint className="size-4 mr-3 text-amber-500" />
                  <div>
                    <div className="font-medium">Mis Mascotas</div>
                    <div className="text-xs text-gray-500">Gestionar mascotas</div>
                  </div>
                </DropdownMenuItem>
                <div className="my-1 h-px bg-amber-200"></div>
                <DropdownMenuItem
                  onClick={() => {
                    logout()
                    navigate("/")
                  }}
                  className="rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                >
                  <LogOut className="size-4 mr-3 text-red-500" />
                  <div>
                    <div className="font-medium">Cerrar Sesión</div>
                    <div className="text-xs text-gray-500">Salir del panel</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail className="bg-gradient-to-b from-amber-200 to-orange-200" />
    </Sidebar>
  )
}

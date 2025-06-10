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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { BarChart3, Calendar, ChevronUp, Heart, Home, Package, Settings, Sparkles, Users, LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useLogout } from "@/hook/auth"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Productos",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "Servicios",
    url: "/admin/services",
    icon: Sparkles,
  },
  {
    title: "Proveedores",
    url: "/admin/suppliers",
    icon: Package,
  },
  {
    title: "Usuarios",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Citas",
    url: "/admin/appointments",
    icon: Calendar,
  },
  {
    title: "Reportes",
    url: "/admin/reports",
    icon: BarChart3,
  }
]

export function AdminSidebar() {

  const navigate = useNavigate()
  const { mutate: logout } = useLogout()

  return (
    <Sidebar variant="inset" className="border-r border-blue-100">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Heart className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-blue-900">PetSpa Admin</span>
            <span className="truncate text-xs text-blue-600">Panel de Control</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-700 font-medium">Gestión</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-blue-50 hover:text-blue-700">
                    <Link to={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-blue-50 data-[state=open]:text-blue-700">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback className="rounded-lg bg-blue-600 text-white">AD</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Admin</span>
                    <span className="truncate text-xs">admin@petspa.com</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem onClick={() => navigate("/")} >
                  <Settings className="size-4 mr-2" />
                  Volver a Inicio
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/my-pets")}>
                  <Settings className="size-4 mr-2" />
                  Mis Mascotas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  logout()
                  navigate("/")
                }}>
                  <LogOut className="size-4 mr-2" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

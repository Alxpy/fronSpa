import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/public/home/HomePage"
import LoginPage from "./pages/public/auth/login/LoginPage"
import RegisterPage from "./pages/public/auth/register/RegisterPage"
import ProductsPage from "./pages/public/products/ProductsPage"
import ServicesPage from "./pages/public/services/ServicesPage"
import DashboardPage from "./pages/private/dashboard/DashboardPage"
import LayoutProtect from "./layout/LayoutProtect"
import NewProductPage from "./pages/private/products/new/NewProductPage"
import AdminServicesPage from "./pages/private/service/AdminServicesPage"
import NewServicePage from "./pages/private/service/new/NewServicePage"
import AdminSupplierPage from "./pages/private/suppliers/AdminSupplierPage"
import NewSupplierPage from "./pages/private/suppliers/new/NewSupplierPage"
import AdminUsersPage from "./pages/private/users/AdminUsersPage"
import AdminProductsPage from "./pages/private/products/AdminProductsPage"
import MyPetsPage from "./pages/private/my-pets/MyPetsPage"
import AppointmentsPage from "./pages/private/appointments/AdminAppointmentsPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<LayoutProtect />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/my-pets" element={<MyPetsPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/products/new" element={<NewProductPage />} />
        <Route path="/admin/services" element={<AdminServicesPage />} />
        <Route path="/admin/services/new" element={<NewServicePage />} />
        <Route path="/admin/suppliers" element={<AdminSupplierPage />} />
        <Route path="/admin/suppliers/new" element={<NewSupplierPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/appointments" element={<AppointmentsPage />} />
      </Route>
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default App
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/Login'
import AuthRegister from './pages/auth/Register'
import AdminLayout from './components/admin-view/layout'
import AdminProducts from './pages/admin-view/Products'
import AdminOrders from './pages/admin-view/Orders'
import AdminDashboard from './pages/admin-view/Dashboard'
import ShoppingLayout from './components/shopping-view/Layout'
import NotFound from './pages/not-found'
import ShoppingAccount from './pages/shopping-view/Account'
import ShoppingCheckout from './pages/shopping-view/Checkout'
import ShoppingListing from './pages/shopping-view/Listing'
import ShoppingHome from '@/pages/shopping-view/Home'
import CheckAuth from '@/components/common/CheckAuth'
import UnauthorizedPage from '@/pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from '@/store/auth-slice'
import { Spinner } from "@/components/ui/spinner";
import PaymentSuccess from './pages/shopping-view/PaymentSuccess'
import PaymentCancel from './pages/shopping-view/PaymentCancel'
import SearchProducts from './pages/shopping-view/SearchProducts'

function App() {

  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-background to-muted">
        <div className="relative">
          <Spinner className="size-12 text-primary" />
          <div className="absolute inset-0 animate-ping">
            <Spinner className="size-12 text-primary opacity-20" />
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground animate-pulse">
          Loading your experience...
        </p>
      </div>
    );
  };

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>

        {/* Redirect root to shopping home */}
        <Route path="/" element={<Navigate to="/shop/home" replace />} />

        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path='home' element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="payment-cancel" element={<PaymentCancel />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        {/* Unauthorized access page */}
        <Route path="/unauth-page" element={<UnauthorizedPage />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;

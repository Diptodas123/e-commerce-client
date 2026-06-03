import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { checkAuth } from '@/store/auth-slice';

// Critical path — eagerly imported so the home screen renders without extra chunk fetches
import CheckAuth from '@/components/common/CheckAuth';
import LoadingScreen from '@/components/common/LoadingScreen';
import ShoppingLayout from '@/components/shopping-view/Layout';
import ShoppingHome from '@/pages/shopping-view/Home';

// Non-critical — lazy-loaded to keep the initial bundle small
const AuthLayout = lazy(() => import('@/components/auth/layout'));
const AuthLogin = lazy(() => import('@/pages/auth/Login'));
const AuthRegister = lazy(() => import('@/pages/auth/Register'));
const AdminLayout = lazy(() => import('@/components/admin-view/layout'));
const AdminProducts = lazy(() => import('@/pages/admin-view/Products'));
const AdminOrders = lazy(() => import('@/pages/admin-view/Orders'));
const AdminDashboard = lazy(() => import('@/pages/admin-view/Dashboard'));
const NotFound = lazy(() => import('@/pages/not-found'));
const ShoppingAccount = lazy(() => import('@/pages/shopping-view/Account'));
const ShoppingCheckout = lazy(() => import('@/pages/shopping-view/Checkout'));
const ShoppingListing = lazy(() => import('@/pages/shopping-view/Listing'));
const UnauthorizedPage = lazy(() => import('@/pages/unauth-page'));
const PaymentSuccess = lazy(() => import('@/pages/shopping-view/PaymentSuccess'));
const PaymentCancel = lazy(() => import('@/pages/shopping-view/PaymentCancel'));
const SearchProducts = lazy(() => import('@/pages/shopping-view/SearchProducts'));

function App() {

  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
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

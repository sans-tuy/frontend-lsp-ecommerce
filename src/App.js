import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import Login from './pages/login';
import SidebarWithHeader from './admin/sidebar';
import ProductList from './pages/list';
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { renderSuspense } from './admin/component/renderSuspense';
import { ProductRoutes } from './pages/product/product.routes';
import ErrorPage from './pages/errorPage';
import { Cart } from './pages/cart';
import Sell from './pages/sell';
import { useSelector } from 'react-redux';

function App() {
  const token = useSelector(state => state.global.tokenApi);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  // should replaced using component to Protect routes
  useEffect(() => {
    if (token !== '') {
      setIsLoggedIn(false);
    }
    if (location.pathname === '/' && isLoggedIn) {
      navigate('/auth/login');
    }
  }, [isLoggedIn, token, location.pathname, navigate]);

  const AdminLayout = () => (
    <>
      <Box textAlign="center" fontSize="xl">
        <SidebarWithHeader>
          <Outlet />
        </SidebarWithHeader>
      </Box>
    </>
  );
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Login />}>
          <Route path="/auth/login" element={<Login />} />
        </Route>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={renderSuspense(<ProductList />)} />

          <Route path="product/*" element={renderSuspense(<ProductRoutes />)} />
          <Route path="cart" element={<Cart />} />
          <Route path="sell" element={<Sell />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;

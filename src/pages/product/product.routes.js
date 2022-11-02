import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { renderSuspense } from '../../admin/component/renderSuspense';

// const Product = lazy(() => import('./Users'));
const ProductDetail = lazy(() => import('./produkDetail'));

export const ProductRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={renderSuspense(<ProductDetail />)} />
      <Route path="/:id" element={renderSuspense(<ProductDetail />)} />
    </Routes>
  );
};

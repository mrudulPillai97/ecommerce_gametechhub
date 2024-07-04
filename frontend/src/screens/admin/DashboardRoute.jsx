import React, { useEffect } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import UsersList from './UsersList';
import CreateProduct from './CreateProduct';
import ProductsList from './ProductsList';
import OrdersList from './OrdersList';
import UpdateProduct from './UpdateProduct';
import UpdateOrder from './UpdateOrder';

const DashboardRoute = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }
);
  const location = useLocation();
  return (
    <div className="w-full sm:grid sm:grid-cols-12 flex flex-col h-[90vh]">
        {/* side bar */}
        <div className="sm:col-span-2 bg-gray-50 text-gray-900 shadow px-4">
            <NavLink to={"/account/admin/dashboard"} className={`block text-base rounded my-1 p-4 hover:bg-gray-200 ${location.pathname === '/account/admin/dashboard' ? 'bg-gray-200' : ''}`}>Dashboard</NavLink>
            <NavLink to={"/account/admin/products"} className={`block text-base rounded my-1 p-4 hover:bg-gray-200 ${location.pathname === '/account/admin/products' ? 'bg-gray-200' : ''}`}>Products</NavLink>
            <NavLink to={"/account/admin/product/new"} className={`block text-base rounded my-1 p-4 hover:bg-gray-200 ${location.pathname === '/account/admin/product/new' ? 'bg-gray-200' : ''}`}>Create Product</NavLink>
            <NavLink to={"/account/admin/orders"} className={`block text-base rounded my-1 p-4 hover:bg-gray-200 ${location.pathname === '/account/admin/orders' ? 'bg-gray-200' : ''}`}>Orders</NavLink>
            <NavLink to={"/account/admin/users"} className={`block text-base rounded my-1 p-4 hover:bg-gray-200 ${location.pathname === '/account/admin/users' ? 'bg-gray-200' : ''}`}>Users</NavLink>
        </div>

        {/* main content */}
        <div className="sm:col-span-10 bg-gray-50 text-gray-900 shadow-md p-4 overflow-y-auto">
            <Routes>
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/products" element={<ProductsList />} />
                <Route exact path="/product/new" element={<CreateProduct />} />
                <Route exact path="/product/:productId/update" element={<UpdateProduct />} />
                <Route exact path="/orders" element={<OrdersList />} />
                <Route exact path="/order/:orderId/update" element={<UpdateOrder />} />
                <Route exact path="/users" element={<UsersList />} />
            </Routes>
        </div>
    </div>
  )
}

export default DashboardRoute;
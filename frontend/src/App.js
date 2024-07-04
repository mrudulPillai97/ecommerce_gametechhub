import React, { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import Register from './screens/Register';
import PageNotFound from './screens/PageNotFound';
import ProductDetails from './screens/ProductDetails';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import UpdatePassword from './screens/UpdatePassword';
import Cart from './screens/Cart';
import Account from './screens/Account';
import UpdateProfile from './screens/UpdateProfile';
import Shipping from './screens/Shipping';
import ConfirmOrder from './screens/ConfirmOrder';
import Orders from './screens/Orders';
import OrderDetails from './screens/OrderDetails';
import CreateReview from './screens/CreateReview';
import DashboardRoute from './screens/admin/DashboardRoute';
import PrivateRoute from './components/PrivateRoute';
import { loadUser } from './actions/UserAction';
import store from './store';
import Products from './screens/Products';
import OrderSuccess from './screens/OrderSuccess';

const App = () => {
    useEffect(() => {
        const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : '';
        store.dispatch(loadUser(token));
    }, [])

    return(
        <div className='w-full'>
            <Header />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/products' element={<Products />} />
                <Route exact path='/products/:search' element={<Products />} />
                <Route exact path='/product/:productId' element={<ProductDetails />} />

                <Route exact path='/login' element={<Login />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/password/forgot' element={<ForgotPassword />} />
                <Route exact path='/password/reset/:token' element={<ResetPassword />} />

                <Route exact path='/account/orders' element={<PrivateRoute Component={Orders} />} />
                <Route exact path='/account/profile' element={<PrivateRoute Component={Account} />} />
                <Route exact path='/account/order/:orderId' element={<PrivateRoute Component={OrderDetails} />} />

                <Route exact path='/account/password/update' element={<PrivateRoute Component={UpdatePassword}/>} />
                <Route exact path='/account/profile/update' element={<PrivateRoute Component={UpdateProfile} />} />

                <Route exact path='/cart' element={<Cart />} />
                <Route exact path='/shipping' element={<Shipping />} />
                <Route exact path='/order/confirm' element={<ConfirmOrder />} />

                <Route exact path='/*' element={<PageNotFound />} />
                <Route exact path='/product/:productId/review/write' element={<CreateReview />} />

                <Route exact path='/account/admin/*' element={<PrivateRoute Component={DashboardRoute} />} />

                <Route exact path='/order/success' element={<OrderSuccess />} />
            </Routes>
            <Footer/>
        </div>
    )
}

export default App
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, ArcElement, Title, Tooltip, Legend } from "chart.js/auto";
import toast from "react-hot-toast";
import { getProductsAdmin } from "../../actions/ProductAction";
import { getOrdersAdmin } from "../../actions/OrderAction";
import { getUsersAdmin } from "../../actions/UserAction";
import Loader from "../../components/Loader";
import MetaData from "../../components/MetaData";

const Dashboard = () => {
    const {loading: productLoading, error: productError, products, productsCount } = useSelector(state => state.productsReducer);
    const { loading: orderLoading, error: orderError , orders, ordersCount } = useSelector(state => state.ordersReducer);
    const { loading: userLoading, error: userError, users, usersCount } = useSelector(state => state.usersReducer);
    const dispatch = useDispatch();

    let outOfStock = 0;

    products.forEach(product => {
        if(product.stock === 0) {
        outOfStock += 1;
        }
    })

    const doughnutData = {
        labels: ['In Stock', 'Out of Stock'],
        datasets: [
        {
            data: [products.length - outOfStock, outOfStock],
            backgroundColor: ['#16a34a', '#dc2626'],
            hoverOffset: 4,
            },
        ],
    };

    useEffect(() => {
        if(productError) {
        toast.error(productError);
        }
    }, [productError])
    
    useEffect(() => {
        dispatch(getProductsAdmin());
        dispatch(getOrdersAdmin());
        dispatch(getUsersAdmin());
    }, [dispatch]);

    return (
        <>
        <MetaData title="Dashboard" />
        {productLoading === true && orderLoading === true && userLoading === true ? <Loader /> : 
        <div>
            {/* <MetaData title="Dashboard" /> */}
            <h1 className="inline-block text-2xl font-bold text-black">Dashboard</h1>

            <div className="py-6 shadow rounded-3xl text-center my-4 bg-gradient-to-r from-grey-50 to-white text-black">
                <p className="text-md">Total Order Amount</p>
                <h2 className="text-3xl font-bold">{orders.reduce((acc, item) => {
                    return (item.orderStatus !== "Cancelled") ? acc + (item.totalPrice) : acc
                }, 0)}</h2>
            </div>

            <div className="grid grid-cols-3 gap-4 my-4 text-white">
                <div className="py-6 shadow rounded-3xl text-center bg-gradient-to-r from-cyan-400 to-cyan-500">
                    <p className="text-md">Total Orders</p>
                    <h2 className="text-3xl font-bold">{ordersCount}</h2>
                </div>
                <div className="py-6 shadow rounded-3xl text-center bg-gradient-to-r from-cyan-500 to-cyan-500">
                    <p className="text-md">Total Users</p>
                    <h2 className="text-3xl font-bold">{usersCount}</h2>
                </div>
                <div className="py-6 shadow rounded-3xl text-center bg-gradient-to-r from-cyan-500 to-cyan-400">
                    <p className="text-md">Total Products</p>
                    <h2 className="text-3xl font-bold">{productsCount}</h2>
                </div>
            </div>

            <div className="flex items-center justify-center">
                {/* line chart */}
                {/* <div className="h-[40vh]">
                <Line data={lineData} />
                </div> */}

                {/* doughnut chart */}
                <div className="h-[40vh] place-self-center">
                <Doughnut data={doughnutData} />
                </div>
            </div>
            
        </div>}
        </>
    )
}

export default Dashboard;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, deleteProductAdmin, getProductsAdmin } from "../../actions/ProductAction";
import { ADMIN_DELETE_PRODUCT_RESET } from "../../constants/ProductConstant";
import { MdEdit, MdDelete } from "react-icons/md";
import DeleteModal from '../../components/DeleteModal';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MetaData from "../../components/MetaData";

const ProductsList = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, products } = useSelector(state => state.productsReducer);
    const { error: deleteError, success } = useSelector(state => state.productUpdateDeleteReducer);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDeleteProduct = (id) => {
        dispatch(deleteProductAdmin(id));
    }

    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if(deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }
        if(success) {
            toast.success('Product has been deleted.');
            dispatch({ type: ADMIN_DELETE_PRODUCT_RESET });
        }
        dispatch(getProductsAdmin());
    }, [dispatch, error, success, deleteError]);

    useEffect(() => {
        setFilteredProducts(products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product._id.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    }, [products, searchQuery]);

    return (
        <div>
            <MetaData title="Products" />
            <h1 className="inline-block text-2xl font-bold text-black">Products</h1>
            <div className="w-1/3 flex my-4">
                <input
                type="text"
                placeholder="Search products by id and name"
                value={searchQuery}
                onChange={handleSearchChange}
                className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block"
                />
            </div>
            <table className="w-full text-left border">
                <thead>
                <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Sr.No</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Product ID</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    products && (searchQuery ? filteredProducts : products).map((product, index) => (
                    <tr className="hover:bg-gray-200 odd:bg-gray-50 even:bg-gray-100" key={product._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product._id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-slate-700 hover:text-slate-800" onClick={() => navigate(`/account/admin/product/${product._id}/update`)}><MdEdit /></button>
                        <button className="text-red-700 hover:text-red-800 ml-2" onClick={() => setShowDeleteModal(true)}><MdDelete /></button>
                        <DeleteModal title={"Delete"} message={"Are you sure you want to delete this product?"} isModalOpen={showDeleteModal} closeModal={() => setShowDeleteModal(false)} id={product._id} handleDelete={handleDeleteProduct} />
                        </td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default ProductsList;
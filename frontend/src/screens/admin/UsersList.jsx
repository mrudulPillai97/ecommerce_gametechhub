import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getUsersAdmin } from "../../actions/UserAction";
import MetaData from "../../components/MetaData";

const UsersList = () => {
    const dispatch = useDispatch();
    const { error, users } = useSelector(state => state.usersReducer);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        if(error) {
        toast.error(error);
        dispatch(clearErrors());
        }
        // if(isDeleted) {
        // toast.success('Product has been deleted successfully.');
        // dispatch({ type: ADMIN_DELETE_PRODUCT_RESET });
        // }
        dispatch(getUsersAdmin());
    }, [dispatch, error]);

    useEffect(() => {
        setFilteredUsers(users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user._id.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase()) || user.role.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    }, [users, searchQuery]);

    return (
        <div>
            <MetaData title="Users" />
            <h1 className="inline-block text-2xl font-bold text-black">Users</h1>
            <div className="w-1/3 flex my-4">
                <input
                type="text"
                placeholder="Search users by id, name, email and role"
                value={searchQuery}
                onChange={handleSearchChange}
                className="mt-2 bg-gray-50 w-full text-sm px-2 py-2 outline outline-1 outline-gray-300 focus:bg-white focus:outline-2 focus:outline-gray-900 rounded block"
                />
            </div>
            <table className="w-full text-left border">
                <thead>
                <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Sr.No</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">User ID</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    users && (searchQuery ? filteredUsers : users).map((user, index) => (
                    <tr className="hover:bg-gray-200 odd:bg-gray-50 even:bg-gray-100" key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user._id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-slate-700 hover:text-slate-800"><MdEdit /></button>
                        {/* <button className="text-red-700 hover:text-red-800 ml-2" onClick={() => setShowDeleteModal(true)}><MdDelete /></button>
                        <DeleteModal title={"Delete"} message={"Are you sure you want to delete this product?"} isModalOpen={showDeleteModal} closeModal={() => setShowDeleteModal(false)} id={product._id} handleDelete={() => handleDeleteProduct(product._id)} /> */}
                        </td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default UsersList;
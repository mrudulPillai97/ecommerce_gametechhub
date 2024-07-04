import React, { useState } from "react";
import { CgClose } from "react-icons/cg";

const DeleteModal = ({ title, message, isModalOpen, closeModal, id, handleDelete }) => {

    const handleConfirmDelete = () => {
        handleDelete(id);
        closeModal();
    };

    if (!isModalOpen) return null
    return (
        <>
            <div className="fixed z-10 left-0 top-0 w-screen h-screen bg-slate-600 bg-opacity-20 flex items-center justify-center">
                <div className="w-[90%] sm:w-[50%] md:w-[30%] bg-slate-50 text-slate-900 rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-xl">{title}</h2>
                        <CgClose onClick={closeModal} className="text-xl cursor-pointer" />
                    </div>
                    <p className="w-full font-normal text-sm">{message}</p>
                    <div className="flex justify-end mt-8">
                        <button onClick={closeModal} className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded mr-2">
                            Cancel
                        </button>
                        <button onClick={handleConfirmDelete} className="text-sm bg-cyan-400 hover:bg-cyan-500 text-white py-1 px-4 rounded">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteModal;
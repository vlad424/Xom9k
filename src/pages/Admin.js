import React, { useState } from 'react';
import CreateType from '../components/modals/CreatType';
import CreateBrand from '../components/modals/CreatBrand';
import CreateProduct from '../components/modals/CreatProduct'; // Путь к вашему компоненту модального окна
import '../pages/admin.css';

const Admin = () => {
    const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
    const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);

    const handleOpenTypeModal = () => {
        setIsTypeModalOpen(true);
    };

    const handleCloseTypeModal = () => {
        setIsTypeModalOpen(false);
    };

    const handleOpenBrandModal = () => {
        setIsBrandModalOpen(true);
    };

    const handleCloseBrandModal = () => {
        setIsBrandModalOpen(false);
    };

    const handleOpenProductModal = () => {
        setIsProductModalOpen(true);
    };

    const handleCloseProductModal = () => {
        setIsProductModalOpen(false);
    };

    return (
        <div className="container_admin">
            <h2 className="header_admin">Работа с товаром</h2>
            <div className="button-container">
                <button className="button" onClick={handleOpenTypeModal}>Добавить категорию</button>
                <button className="button" onClick={handleOpenBrandModal}>Добавить подкатегорию</button>
                <button className="button" onClick={handleOpenProductModal}>Добавить товар</button>
            </div>
            {isTypeModalOpen && <CreateType onClose={handleCloseTypeModal} />}
            {isBrandModalOpen && <CreateBrand onClose={handleCloseBrandModal} />}
            {isProductModalOpen && <CreateProduct onClose={handleCloseProductModal} />}
        </div>
    );
};

export default Admin;
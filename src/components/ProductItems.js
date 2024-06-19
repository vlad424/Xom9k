import React from "react";
import { Link } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

const ProductItems = ({ product, onClick }) => {
    const productLink = product.id ? `${DEVICE_ROUTE}/${product.id}` : `${DEVICE_ROUTE}/undefined`;
    if (!product || product.length === 0) {
        return <div>No products available.</div>;
      }
    
    return (
        <Link to={productLink} className="product-card" onClick={onClick}>
            <img src={ process.env.REACT_APP_API_URL + product.images} alt={product.name} />
            <p>{product.name}</p>
            <p>Цена: {product.price} ₽</p>
        </Link>
    );
};

export default ProductItems;
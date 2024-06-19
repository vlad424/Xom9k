import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const ProductInfo = observer(() => {
    const { device } = useContext(Context);
    const selectedProduct = device.selectedProduct;

    if (!selectedProduct || !selectedProduct.name) {
        return <div className="product-info">Выберите продукт для отображения</div>;
    }

    return (
        <div className="product-info">
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <ul>
                {selectedProduct.characteristics.map((char, index) => (
                    <li key={index}>{char}</li>
                ))}
            </ul>
            <p>Цена: {selectedProduct.price}</p>
        </div>
    );
});

export default ProductInfo;
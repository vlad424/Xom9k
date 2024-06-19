import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import ProductItems from './ProductItems';

const ProductList = observer(() => {
    const { device } = useContext(Context);

    const selectProduct = (product) => {
        device.setSelectedProduct(product);
    };

    return (
        <div className="product-list-container">
            <div className="filter-buttons">
                <button>Цвет</button>
                <button>Размер</button>
                <button>Бренд</button>
                <button>Цена</button>
            </div>
            <div className="products">
                {device.products && device.products.length > 0 ? (
                    device.products.map(product => (
                        <ProductItems key={product.id} product={product} onClick={() => selectProduct(product)} />
                    ))
                ) : (
                    <p>Товары отсутствуют</p>
                )}
            </div>
        </div>
    );
});

export default ProductList;
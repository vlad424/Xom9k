import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..'; // Проверьте правильность пути к вашему контексту
import './devicePage.css';

const DevicePage = observer(() => {
    const { device } = useContext(Context); // Получаем доступ к хранилищу через useContext
    const selectedProduct = device.selectedProduct; // Получаем выбранный продукт
    const description = selectedProduct?.characteristics; // Получаем характеристики выбранного продукта

    if (!selectedProduct || !selectedProduct.name) {
        return <div className="device-page">Выберите продукт для отображения</div>;
    }
   
    return (
      <div className="device-page">
          <div className="product-container">
              <div className="product-image">
                  {/* <img src={selectedProduct.images[0]} alt={selectedProduct.name} /> */}
              </div>
              <div className="product-details">
                  <h2>{selectedProduct.name}</h2>
                  <h3>Цена: {selectedProduct.price}</h3>
                  {/* <select className="size-selector">
                      <option value="" disabled selected>Выберите размер</option>
                      {selectedProduct.sizes.map(size => (
                          <option key={size} value={size}>{size}</option>
                      ))}
                  </select> */}
                  <div className="right">
                      <button className="add-to-cart">Добавить в корзину</button>
                      <button className="add-to-favorites">Добавить в избранное</button>
                  </div>
              </div>
          </div>
          <div className="section">
              <h1 className="title">О товаре</h1>
              {description && description.map(info => (
                  <div key={info.id} className="characteristic">
                      <strong>{info.title}:</strong> {info.description}
                  </div>
              ))}
          </div>
      </div>
  );
});
export default DevicePage;
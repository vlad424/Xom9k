import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import '../modals/creatProduct.css';
import { Context } from '../..';

const CreateProduct = observer(({ onClose }) => {
    const { device } = useContext(Context);

    const [selectedType, setSelectedType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [image, setImage] = useState(null);
    const [characteristics, setCharacteristics] = useState([{ id: Date.now(), title: '', description: '' }]);

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        setSelectedCategory(''); // Reset category when type changes
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleAddCharacteristic = () => {
        setCharacteristics([...characteristics, { id: Date.now(), title: '', description: '' }]);
    };

    const handleCharacteristicChange = (id, field, value) => {
        setCharacteristics(characteristics.map(characteristic =>
            characteristic.id === id ? { ...characteristic, [field]: value } : characteristic
        ));
    };

    const handleRemoveCharacteristic = (id) => {
        setCharacteristics(characteristics.filter(characteristic => characteristic.id !== id));
    };

    return (
        <div className="modal-overlay-Product">
            <div className="modal-content-Product">
                <h2>Добавить товар</h2>
                <select value={selectedType} onChange={handleTypeChange}>
                    <option value="" disabled>Выберите категорию</option>
                    {device.types.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                </select>
                <select value={selectedCategory} onChange={handleCategoryChange} disabled={!selectedType}>
                    <option value="" disabled>Выберите подкатегорию</option>
                    {selectedType && device.categories.filter(category => category.typeId === parseInt(selectedType)).map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <div className="image-upload-container">
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <div className="image-preview">
                        {image ? <img src={image} alt="Выбранное изображение" /> : <span>Не выбран файл</span>}
                    </div>
                </div>
                <div className="characteristics-container">
                    {characteristics.map((characteristic, index) => (
                        <div key={characteristic.id} className="characteristic-inputs">
                            <input
                                type="text"
                                placeholder="Название свойства"
                                value={characteristic.title}
                                onChange={(e) => handleCharacteristicChange(characteristic.id, 'title', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Описание свойства"
                                value={characteristic.description}
                                onChange={(e) => handleCharacteristicChange(characteristic.id, 'description', e.target.value)}
                            />
                            <button onClick={() => handleRemoveCharacteristic(characteristic.id)}>Удалить</button>
                        </div>
                    ))}
                    <button onClick={handleAddCharacteristic}>Добавить Характеристику</button>
                </div>
                <div className="modal-buttons-Product">
                    <button className="cancel-button-Pr" onClick={onClose}>Закрыть</button>
                    <button className="cancel-button2-Pr">Добавить</button>
                </div>
            </div>
        </div>
    );
});

export default CreateProduct;
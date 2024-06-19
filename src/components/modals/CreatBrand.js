import React, {useContext, useState ,useEffect} from 'react';
import '../modals/creatBrand.css';
import { createBrand, fetchTypes } from '../http/productAPI';
import { Context } from '../..';

const CreatBrand = ({ onClose }) => {
    const { device } = useContext(Context);
    const [value, setValue] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [types, setTypes] = useState([]);

   

    const addType = () => {
        createBrand({name: value}).then(data =>{
            setValue('')
            onClose();
        })
    }
    
    useEffect(() => {
        fetchTypes().then(data => setTypes(data));
    }, []);

    const addSubcategory = () => {
        const type = types.find(t => t.id === selectedType);

        if (type) {
            const category = type.categories.find(c => c.id === selectedCategory);

            if (category) {
                if (!category.subcategories) {
                    category.subcategories = [];
                }

                category.subcategories.push({ id: Date.now(), name: value }); // Присваиваем временный ID

                // Обновляем данные на сервере
                createBrand({ id: selectedType, categories: types }).then(() => {
                    setValue('');
                    setSelectedType('');
                    setSelectedCategory('');
                    onClose();
                });
            }
        }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <div className="modal-overlay-Brand">
            <div className="modal-content-Brand">
                <h2>Добавить подкатегорию</h2>
                <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                    <option value="">Выберите категорию</option>
                    {types.map(type => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>
               
                
                <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Название подкатегории"
                />
                <div className="modal-buttons-Brand">
                    <button className="cancel-button-Brand" onClick={onClose}>Закрыть</button>
                    <button className="cancel-button2-Brand" onClick={addType}>Добавить</button>
                </div>
            </div>
        </div>
    );
};


export default CreatBrand;
import React, { useState } from 'react';
import '../modals/сreateType.css';
import { createType } from '../http/productAPI';

const CreateType = ({ onClose }) => {

    const [value,setValue] = useState('')

    const addType = () => {
        createType({name: value}).then(data =>{
            setValue('')
            onClose();
        })
    }
    return (
        <div className="modal-overlay-Type">
            <div className="modal-content-Type">
                <h2>Добавить категорию</h2>
                <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Название категории" />
                <div className="modal-buttons-Type">
                    <button className="cancel-button-Ty" onClick={onClose}>Закрыть</button>
                    <button className="cancel-button2-Ty" onClick={addType}>Добавить</button>
                </div>
            </div>
        </div>
    );
};

export default CreateType;
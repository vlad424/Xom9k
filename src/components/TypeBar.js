import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ListGroup } from 'react-bootstrap';
import { Context } from '..';
import './typeBar.css';
import { type } from '@testing-library/user-event/dist/type';

const TypeBar = observer(() => {
   
    const { device } = useContext(Context);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});

    const handleCategoryClick = (category) => {
        // Toggle expanded state
        setExpandedCategories(prevState => ({
            ...prevState,
            [category.id]: !prevState[category.id]
        }));

        setSelectedCategory(category);
        setSelectedSubCategory(null);

        // Set products based on the clicked category
        
        const allProducts = category.categories.flatMap(subCategory => subCategory.products);
        console.log('All Products:', allProducts);
        device.setProducts(allProducts);
        
    };

    const handleSubCategoryClick = (subCategory) => {
        setSelectedSubCategory(subCategory);
        device.setProducts(subCategory.products);
    };

    const getTitle = () => {
        if (selectedSubCategory) {
            return selectedSubCategory.name;
        }
        if (selectedCategory) {
            return selectedCategory.name;
        }
        return "Женская";
    };

    return (
        <div className="sidebar">
            <h2>{getTitle()}</h2>
            <div className="categories">
                {device.types.map(type => (
                    <div key={type.id}>
                        <button
                            onClick={() => handleCategoryClick(type)}
                            className="category-btn"
                        >
                            {type.name}
                            <span className={expandedCategories[type.id] ? "arrow-down" : "arrow-right"}></span>
                        </button>
                        <div
                            className={`sub-categories ${expandedCategories[type.id] ? "expanded" : ""}`}
                            style={{ maxHeight: expandedCategories[type.id] ? "100px" : "0px" }}
                        >
                            {type.categories && type.categories.map(subCategory => (
                                <button key={subCategory.id} onClick={() => handleSubCategoryClick(subCategory)} className="subcategory-btn">
                                    {subCategory.name}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

   


export default TypeBar;
import { makeAutoObservable } from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [];
        this._categories = [];
        this._products = [];
        this._selectedType = {};

        makeAutoObservable(this);
    }

    setSelectedProduct(product) {
        this._selectedProduct = product;
    }

    setTypes(types) {
        this._types = types;
        this._categories = this._types.flatMap(type => type.categories || []); // Проверка на наличие categories
        this._products = this._categories.flatMap(category => category.products || []); // Проверка на наличие products
    }

    setCategories(categories) {
        this._categories = categories;
    }

    setProducts(products) {
        this._products = products;
    }

    setSelectedType(type) {
        this._selectedType = type;
    }

    get types() {
        return this._types;
    }

    get categories() {
        return this._categories;
    }

    get products() {
        return this._products;
    }

    get selectedType() {
        return this._selectedType;
    }

    get selectedProduct() {
        return this._selectedProduct;
    }
}
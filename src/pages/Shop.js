import React, { useContext, useEffect, useState } from 'react';
import '../pages/shop.css'
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { Container,Row,Col } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import ProductList from '../components/ProductList';
import { fetchBrands, fetchProducts, fetchTypes } from '../components/http/productAPI';



const Shop = observer(() => {
 
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then(data => {
      console.log('Fetched Types:', data);
      device.setTypes(data);
    });

    fetchBrands().then(data => {
      console.log('Fetched Brands:', data);
      device.setCategories(data);
    });

    fetchProducts().then(data => {
      console.log('Fetched Products:', data.rows);
      device.setProducts(data.rows);
    });
  }, []);

  return (
    <Container fluid className="shop-container">
      <Row>
        <Col md={3} className="sidebar-container">
          <TypeBar />
        </Col>
        <Col md={9} className="product-list-container">
          <ProductList />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByNAmeThunk, filterProductThunk, getProductsThunk, setProducts } from '../store/slices/products.slice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Col, Form, InputGroup, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { addToCartThunk, checkoutCartThunk } from '../store/slices/cart.slice';

const Home = () => {

  const dispatch = useDispatch();
  const productsList = useSelector(state => state.products);
  const [inputValue, setInputValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [quantityFromHome, setQuantityFromHome] = useState(1);


  useEffect(() => {
    dispatch(getProductsThunk());

    axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
      .then(res => setCategories(res.data.data.categories));
  }, []);

  // console.log(productsList);

  const addToCartFromHome = (productFromHome) =>{
    const productHome = {
      id: `${productFromHome}`,
      quantity: quantityFromHome 
    }
    // console.log(productHome);
    dispatch(addToCartThunk(productHome))
  }


  return (
    <div>
      <div className='seeker-by-name'>
        <InputGroup className="mb-3" id='input-by-name'>
          <Form.Control
            placeholder="Search by name"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <Button variant="outline-secondary" id="button-addon2" onClick={() => dispatch(filterByNAmeThunk(inputValue))}>
            Search
          </Button>
        </InputGroup>
      </div>
      <Row style={{ margin: '20px 0' }}>
        {/* CATEGORIES */}
        <Col lg={2} className='mb-4'>
          <div>
            <h3 style={{color: 'yellowgreen', textAlign: 'center'}}>Categories</h3>
            <ListGroup>
              {
                categories.map((category) => (
                  <ListGroup.Item
                    className='categories'
                    onClick={() => dispatch(filterProductThunk(category.id))}
                    key={category.id}>
                    {category.name}
                  </ListGroup.Item>
                ))
              }
              <ListGroupItem className='categories' onClick={() => dispatch(getProductsThunk())}>All Categories</ListGroupItem>
            </ListGroup>
          </div>
        </Col>
        {/* PRODUCTS */}
        <Col lg={10} className='mb-5'>
          <Row xs={1} md={2} lg={3} className="g-4">
            {
              productsList.map((product) => (
                <Col className='container-products' key={product.id}>
                  <Card className='product-card' style={{ border: '2px solid #fff' }} >
                    <Link className='product-detail' to={`/product/${product.id}`}>
                      <div className='image-box'>
                        <Card.Img
                          className='img-product'
                          variant="top"
                          src={product.productImgs[0]}
                        />
                      </div>
                      <Card.Body>
                        <Card.Title className='title-and-price'> {product.title}</Card.Title>
                        <Card.Text className='title-and-price'>Price: {product.price}</Card.Text>
                      </Card.Body>
                    </Link>
                    <button onClick={()=> addToCartFromHome(product.id)}><i className="fa-solid fa-cart-shopping"></i></button>
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>
        <div style={{textAlign: 'center'}}>Developed by Evelyn H. GL</div>
      </Row>
    </div>
  );
};

export default Home;
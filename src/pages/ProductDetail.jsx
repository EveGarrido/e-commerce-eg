import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { Link } from 'react-router-dom';
import { Card, Carousel, Col, ListGroup, Row } from 'react-bootstrap';
import { addToCartThunk } from '../store/slices/cart.slice';

const ProductDetail = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  const productsList = useSelector((state) => state.products);

  const productFound = productsList.find((product) => product.id === Number(id));
  const relatedProducts = productsList.filter((productRelated) =>
    productRelated.category.id === productFound?.category.id &&
    productRelated.id !== productFound.id
  )

  // console.log(productFound);

  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  }

  const decrement = () => {
    setQuantity(quantity - 1);
  }

  const addToCart = () => {
    const product = {
      id: productFound.id,
      quantity: quantity
    };
    // console.log(product);
    dispatch(addToCartThunk(product));
  };

  const addToCartFronRelatedProducts = (product) => {
    const product2 = {
      id: `${product}`,
      quantity: quantity
    };
    // console.log(product2);
    dispatch(addToCartThunk(product2));
  }

  return (
    <div>
      <Row className="mt-5 container-product-id" >
        <Col lg={6} className='product-id'>
          <Carousel className='product-id carousel'>
            <Carousel.Item>
              <img
                className="d-block w-100 img-carousel"
                src={productFound?.productImgs[0]}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 img-carousel"
                src={productFound?.productImgs[1]}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 img-carousel"
                src={productFound?.productImgs[2]}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col lg={6} className='product-id'>
          <h2>{productFound?.title}</h2>
          <p>{productFound?.description}</p>
          <h4>$ {productFound?.price}</h4>
          <div className='btns-quantity'>
            <button onClick={increment} className='btn-plus-and-less'>+</button>
            <input
              type='text'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ width: '10%', margin: '0 10px', textAlign: 'center' }}
            >
            </input>
            <button onClick={decrement} disabled={quantity <= 1} className='btn-plus-and-less'>-</button>
          </div>
          <button onClick={addToCart} className='btn-add-cart'>Add to the cart</button>
        </Col>
        {/* PRODUCTS RELATED */}
        <h4 className='title-related'>You might also be interested</h4>
        <div className='box-products-related'>
          {
            relatedProducts.map((productRelated) => (
              <Col lg={3} key={productRelated.id} className='container-products-related mb-5'>
                <Card key={productRelated.id} className='products-related-card'>
                  <Link className='product-related-details' to={`/product/${productRelated.id}`}>
                    <div className='image-box-related'>
                      <Card.Img
                        variant="top"
                        src={productRelated?.productImgs[0]}
                        className='img-product-related'
                      />
                    </div>
                    <Card.Body>
                      <Card.Title className='title-and-price'> {productRelated.title}</Card.Title>
                      <Card.Text className='title-and-price'>$ {productRelated.price}</Card.Text>
                    </Card.Body>
                  </Link>
                  <button
                    className='btn-add-cart'
                    onClick={()=> addToCartFronRelatedProducts(productRelated.id)}
                  >
                    <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                </Card>
              </Col>
            ))
          }
        </div>
      </Row>
    </div>
  );
};

export default ProductDetail;
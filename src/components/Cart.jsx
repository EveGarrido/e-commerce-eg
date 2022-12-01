import React, { useEffect } from 'react';
import { Col, Container, Offcanvas, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCartThunk, deleteProductCartThunk, getCartProductsThunk } from '../store/slices/cart.slice';

const Cart = ({ show, handleClose }) => {

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(getCartProductsThunk());
  }, [])

  const pricesProductsCart = cart.map((product) => Number(product.price * product.productsInCart.quantity));
  const totalPrices = pricesProductsCart.reduce((a, b) => a + b, 0);
  // console.log(pricesProductsCart);
  // console.log(totalPrices);

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <i className="fa-solid fa-cart-shopping"></i>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>

        <Container className='container-products-cart'>
          {
            cart.map((product) => (
              <Row className='product-cart mb-4' key={product.id} xs={1} md={1}>
                <Col lg={10}>
                  <p style={{ opacity: '0.4' }}>{product.brand}</p>
                  <h5>{product.title}</h5>
                  <div className='square-btn-delete' >
                    {product.productsInCart.quantity}
                  </div>
                </Col>
                <Col lg={2} onClick={() => dispatch(deleteProductCartThunk(product.id))}><i className="fa-solid fa-trash btn-delete"></i></Col>
                <Col lg={12} style={{ textAlign: 'end' }}>Total: {product.price * product.productsInCart.quantity}</Col>
              </Row>
            ))
          }
        </Container>
        <h4>Total: {totalPrices}</h4>
        <button onClick={() => dispatch(checkoutCartThunk())} className='btn-pay'>Pay</button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
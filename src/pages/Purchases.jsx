import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchasesSlice';

const Purchases = () => {

  const dispatch = useDispatch();

  const purchases = useSelector(state => state.purchases)

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, [])


  return (
    <div >
      <h2 style={{color: 'yellowgreen'}}>My Purchases</h2>
      <div className='container-purchases'>
        {
          purchases.map((purchase) => (
            purchase.cart.products.map((product) => (
              <Card style={{width: '70%'}}  className='mt-4' key={product.id}>
                <Card.Header style={{backgroundColor: 'white', opacity: '0.5'}}>{product.createdAt.slice(0,10)}</Card.Header>
                <Link style={{textDecoration: 'none', color: '#fff'}} to={`/product/${product.id}`}>
                  <Card.Body className='purchase-details'>
                    <Card.Title style={{width: '60%'}}>{product.title}</Card.Title>
                    <Card.Text  className='square-quatity-purchase'>{product.productsInCart.quantity}</Card.Text>
                    <Card.Text style={{width: '25%', textAlign: 'end'}}>$ {product.price}</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            ))
          ))
        }
      </div>
    </div>
  );
};

export default Purchases;
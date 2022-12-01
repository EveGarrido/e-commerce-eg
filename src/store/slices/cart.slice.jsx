import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
      getCart: (state, action)=>{
        return action.payload;
      }
    }
})

export const getCartProductsThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api.academlo.tech/api/v1/cart', getConfig())
        .then((res) => dispatch(getCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addToCartThunk = (productToCart) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api.academlo.tech/api/v1/cart', productToCart, getConfig())
        .then((res) => dispatch(getCartProductsThunk()))
        .catch(error => console.log(error))
        .finally(() => dispatch(setIsLoading(false)));
}

export const checkoutCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api.academlo.tech/api/v1/purchases', {}, getConfig())
        .then(() => dispatch(getCart([])))
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteProductCartThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`, getConfig())
        .then(() => dispatch(getCartProductsThunk()))
        .catch(error => console.log(error))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { getCart } = cartSlice.actions;

export default cartSlice.reducer;

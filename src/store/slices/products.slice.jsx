import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const productSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action)=>{
            return action.payload
        }
    }
})

export const getProductsThunk = ()=> dispatch => {
    dispatch(setIsLoading(true));
    axios.get('https://e-commerce-api.academlo.tech/api/v1/products')
        .then(res => dispatch (setProducts(res.data?.data.products)))
        .finally(()=> dispatch (setIsLoading(false)));
}

export const filterProductThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`)
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const filterByNAmeThunk = (inputValue) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?query=${inputValue}`)
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;

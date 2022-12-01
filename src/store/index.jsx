import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cart.slice'
import isLoadingSlice from './slices/isLoading.slice'
import productSlice from './slices/products.slice'
import purchasesSlice  from './slices/purchasesSlice'

export default configureStore({
    reducer: {
      products: productSlice,
      isLoading: isLoadingSlice,
      purchases: purchasesSlice, 
      cart: cartSlice
    }
});

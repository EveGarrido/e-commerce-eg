import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice from './slices/isLoading.slice'
import productSlice from './slices/products.slice'

export default configureStore({
    reducer: {
      products: productSlice,
      isLoading: isLoadingSlice
    }
})

import { createSlice } from '@reduxjs/toolkit';

export const isLoadindSlice = createSlice({
    name: 'isLoading',
    initialState: true,
    reducers: {
        setIsLoading: (state, action)=>{
            return action.payload
        }
    }
})

export const { setIsLoading } = isLoadindSlice.actions;

export default isLoadindSlice.reducer;

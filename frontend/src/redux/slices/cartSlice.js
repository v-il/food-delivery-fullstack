import { axiosQuery } from "@/helpers/queries/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    disabledAddToCartButton: false
}

export const addToCartReducer = createAsyncThunk(
    'cart/add',
    async function ({itemId, size}, {rejectWithValue}) {
        const response = await axiosQuery.post('/cart-items/add', {
            cart_id: localStorage.getItem('cart'),
            item_id: itemId,
            size
        })

        if (response.status === 200) {
            return response.data
        } else {
            rejectWithValue(response.message);
        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(addToCartReducer.pending, (state) => {
            state.disabledAddToCartButton = true;
        })
        
        .addCase(addToCartReducer.fulfilled, (state) => {
            state.disabledAddToCartButton = false;
        })
        
        .addCase(addToCartReducer.rejected, (state) => {
            state.disabledAddToCartButton = false;
        })
    }
})

export default cartSlice.reducer;
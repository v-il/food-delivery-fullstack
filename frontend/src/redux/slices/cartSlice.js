import { axiosQuery } from "@/helpers/queries/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    disabledAddToCartButton: false,
    cost: 0,
    link: '',
    orders: []
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

export const getCartContentReducer = createAsyncThunk(
    'cart/get',
    async function (_, {rejectWithValue}) {
        const response = await axiosQuery.get('/carts')

        if (response.status === 200) {
            return response.data
        } else {
            rejectWithValue(response.message);
        }
    }
)

export const getMyOrdersReducer = createAsyncThunk(
    'order/getMy',
    async function({id}, {rejectWithValue}) {
        const response = await axiosQuery.get(`/orders/${id}`);

        if (response.status === 201 | 200) {
            return response.data
        } else {
            rejectWithValue(response.message);
        }
    }
)

export const sendOrderReducer = createAsyncThunk(
    'order/add',
    async function ({user_id, name, address, delivery_time, comment, cart_id, promocode}, {rejectWithValue}) {
        const response = await axiosQuery.post('/orders', {
            user_id, name, address, delivery_time, comment, cart_id, promocode
        });

        if (response.status === 201 | 200) {
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

        .addCase(getCartContentReducer.fulfilled, (state, action) => {
            state.items = action.payload.items;
            state.cost = 0;
            action.payload.items.map((item) => state.cost += item.CartItem.total_price)            
        })

        .addCase(sendOrderReducer.fulfilled, (state, action) => {
            state.link = action.payload.link;
            localStorage.removeItem('cart');
            window.location.replace(`/pay?code=${action.payload.link}`);
        })

        .addCase(getMyOrdersReducer.fulfilled, (state, action) => {
            state.orders = action.payload
        })
    }
})

export default cartSlice.reducer;
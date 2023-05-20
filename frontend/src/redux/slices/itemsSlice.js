import { axiosQuery } from "@/helpers/queries/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    itemsPreloader: true
}

export const fetchItemsReducer = createAsyncThunk(
    'items/fetch',
    async function({category}, {rejectWithValue}) {
        const response = await axiosQuery.get(`/categories/items/${category}`);

        if (response.status === 200) {
            return response.data
        } else {
            rejectWithValue(response.message)
        }
    }
)

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchItemsReducer.fulfilled, (state, action) => {
            state.items = action.payload

            state.itemsPreloader = false;
            console.log(action.payload);
        })
        
        .addCase(fetchItemsReducer.rejected, (state) => {
            state.itemsPreloader = false;
        })
    }
})

export default itemsSlice.reducer;
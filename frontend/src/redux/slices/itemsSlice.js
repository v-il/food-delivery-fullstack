import { axiosQuery } from "@/helpers/queries/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
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
            console.log(action.payload)
        })
    }
})

export default itemsSlice.reducer;
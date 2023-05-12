import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
})
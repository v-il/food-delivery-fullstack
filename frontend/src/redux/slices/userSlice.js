import { axiosQuery } from "@/helpers/queries/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: [],
    isAuth: false,
    userPreloader: true,
    tokenError: false,
    tokenPreloader: true
}

export const getTokenReducer = createAsyncThunk(
    'user/getToken',
    async function({link}, {rejectWithValue}) {
        const response = await axiosQuery.get(`/user/token/${link}`);

        if (response.status === 200) {
            return response.data
        } else {
            rejectWithValue(response.error.message)
        }
    }
)

export const fetchUserInfoReducer = createAsyncThunk(
    'user/fetch',
    async function(_, {rejectWithValue}) {
        const response = await axiosQuery.get(`/user/getInfo`);
        if (response.status === 200) {
            return response.data
        } else {
            rejectWithValue(response.error.message)
        }
    }
)

export const updateUserInfoReducer = createAsyncThunk(
    'user/fetch',
    async function({tg_id, rl_name, address, phone, birthday}, {rejectWithValue}) {
        const response = await axiosQuery.post(`/user/update`, {
            rl_name,
            phone,
            birthday,
            address
        });
        if (response.status === 200) {
            return response.data
        } else {
            rejectWithValue(response.error.message)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfoReducer.fulfilled, (state, action) => {
            state.isAuth = true;
            state.user = action.payload
        })

        .addCase(getTokenReducer.fulfilled, (state, action) => {
            console.log(action);
            state.isAuth = true;
            state.tokenError = false;
            state.tokenPreloader = false;
        })

        .addCase(getTokenReducer.rejected, (state, action) => {
            console.log(action);
            state.tokenError = true;
            state.tokenPreloader = false;
        })
    }
})

export default userSlice.reducer;
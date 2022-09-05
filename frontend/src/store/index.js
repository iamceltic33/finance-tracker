import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {ADD_OP, DELETE_OP, EDIT_OP, GET_ALL_OP} from '../pathes';
import axios from "axios";



export const fetchAllOperations = createAsyncThunk(
    'fetchAllOperations',
    async (thunkApi) => {
        const response = await axios(GET_ALL_OP);
        return response.data;        
    }
)

export const fetchAddOperation = createAsyncThunk(
    'fetchAddOperation',
    async (operation) => {
        const response = await axios.put(ADD_OP, operation);
        return response.data;
    }
)

export const fetchDeleteOperation = createAsyncThunk(
    'fetchDeleteOperation',
    async (id) => {
        const response = await axios.delete(DELETE_OP + id);
        return response.data;
    }
)

export const fetchEditOperation = createAsyncThunk(
    'fetchEditOperation',
    async ({operation, id}) => {
        console.log(operation, id);
        const response = await axios.put(EDIT_OP + id, operation);
        return response.data;
    }
)

const initialState = {
    data: [],
    loading: 'idle',
    current: null
}

const operationsSlice = createSlice({
    name: 'operations',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchAllOperations.pending]: (state) => {
            state.loading = 'idle';
        },
        [fetchAllOperations.fulfilled]: (state, action) => {
            state.loading = 'succeeded';
            state.data = action.payload;
        },
        
        [fetchAddOperation.pending]: (state, action) => {
            state.loading = 'succeeded';
        },
        [fetchAddOperation.fulfilled]: (state, action) => {
            state.loading = 'succeeded';
            state.data = action.payload;
        },

        [fetchDeleteOperation.pending]: (state, action) => {
            state.loading = 'succeeded';
        },
        [fetchDeleteOperation.fulfilled]: (state, action) => {
            state.loading = 'succeeded';
            state.data = action.payload;
        },

        [fetchEditOperation.pending]: (state, action) => {
            state.loading = 'succeeded';
        },
        [fetchEditOperation.fulfilled]: (state, action) => {
            state.loading = 'succeeded';
            state.data = action.payload;
        }
    }
})

export const reducer = operationsSlice.reducer;

export const store = configureStore({
    reducer: {
        operations: reducer
    }
})
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
	cartItems: [],
	amount: 4,
	total: 0,
	isLoading: true,
	error: ""
};

export const getCartItems = createAsyncThunk(
	'cart/getCartItems',
	async () => {
		try {
			const response = await axios.get(url);
			const data = await response.data;
			return data;
		} catch (err) {
			return err.message;
		}
	}
);

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clearCart: (state, _action) => {
			state.cartItems = [];
		},
		removeItem: (state, action) => {
			const itemId = action.payload;
			state.cartItems = state.cartItems.filter(
				(item) => item.id !== itemId
			);
		},
		increase: (state, action) => {
			const itemId = action.payload;
			const cartItem = state.cartItems.find(
				(item) => item.id === itemId
			);
			cartItem.amount = cartItem.amount + 1;
		},
		decrease: (state, action) => {
			const itemId = action.payload;
			const cartItem = state.cartItems.find(
				(item) => item.id === itemId
			);
			cartItem.amount = cartItem.amount - 1;
		},
		calculateTotals: (state) => {
			let amount = 0;
			let total = 0;
			state.cartItems.forEach((item) => {
				amount += item.amount;
				total += item.amount * item.price;
			});
			state.amount = amount;
			state.total = total;
		},
	},
	extraReducers: {
		[getCartItems.pending]: (state, action) => {
			state.isLoading = true
		},
		[getCartItems.fulfilled]: (state, action) => {
			console.log(action);
			state.isLoading = false;
			state.cartItems = action.payload;
		},
		[getCartItems.rejected]: (state, action) => {
			console.log(action);
			state.isLoading = false;
			state.error = action.payload;
		}
	}
});

export const {
	clearCart,
	removeItem,
	increase,
	decrease,
	calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;

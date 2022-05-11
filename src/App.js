import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import Navbar from './components/Navbar';

import {
	calculateTotals,
	getCartItems,
} from './features/cart/cartSlice';

const App = () => {
	const { cartItems, isLoading } = useSelector((store) => store.cart);
	const { isOpen } = useSelector((store) => store.modal);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(calculateTotals());
	}, [dispatch, cartItems]);

	useEffect(() => {
		dispatch(getCartItems());
	}, [dispatch]);

	if (isLoading) {
		return (
			<div className='loading'>
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<main>
			{isOpen && <Modal />}
			<Navbar />
			<CartContainer />
		</main>
	);
};
export default App;

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
import {
  CartIconContainer,
  IconCount,
  ShoppingIcon,
} from './cart-icon.styles';

const CartIcon = () => {
	const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

	const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

	return (
		<CartIconContainer
			onClick={toggleIsCartOpen}
		>
			<ShoppingIcon className='shopping-icon' />
			<IconCount>{cartCount}</IconCount>
		</CartIconContainer>
	);
}

export default CartIcon;
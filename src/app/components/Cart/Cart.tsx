import useStore from '@/app/store/useStore';
import './style.scss'
import { IoMdClose } from "react-icons/io";
const Cart = () => {

    const { cart, showCart } = useStore();

    return (
        <>
            {cart &&
                <div className='cart-container'>
                    <div className='container-text-close'>
                        <div className='text'>Carrinho de compras</div>
                        <div className='close' onClick={showCart}>
                            <IoMdClose color='#fff' size={30} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Cart;
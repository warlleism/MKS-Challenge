import useStore from '@/app/store/useStore';
import './style.scss'
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { IoMdRemove } from "react-icons/io";
import { useEffect } from 'react';
const Cart = () => {

    const { cart, showCart, cartProducts, incrementQuantity, decrementQuantity, removeItemCart } = useStore();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cart && event.target && !(event.target as HTMLElement).closest('.cart-container')) {
                showCart();
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, [cart, showCart]);

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

                    <div className="container-cart-products">
                        {
                            cartProducts?.map((item, index) => {
                                return (
                                    <div className="container-products" key={index}>
                                        <div className='remove-item' onClick={() => removeItemCart(item?.id)}>
                                            <IoMdClose color='#fff' size={17} />
                                        </div>
                                        <img src={item.photo} />
                                        <div className='name-text-cart'>{item.name}</div>
                                        <div className='container-qtd'>
                                            <div className='qtd'>Qtd:</div>
                                            <div className='container-select-qtd'>
                                                <div onClick={() => incrementQuantity(item.id)} style={{ cursor: 'pointer' }}><FaPlus size={12} /></div>
                                                <div>{item.quantity}</div>
                                                <div onClick={() => decrementQuantity(item.id)} style={{ cursor: 'pointer' }}><IoMdRemove size={12} /></div>
                                            </div>
                                        </div>
                                        <div className='price-text-cart'>R${item?.valorTotal ? item?.valorTotal : parseInt(item.price).toFixed()}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Cart;
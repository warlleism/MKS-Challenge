import useStore from '@/app/store/useStore';
import './style.scss'
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { IoMdRemove } from "react-icons/io";

const Cart = () => {

    const { cart, showCart, cartProducts, incrementQuantity, decrementQuantity, removeItemCart } = useStore();

    const totalPrice = cartProducts.reduce((total, product) => {
        const valorTotal = product.valorTotal ?? product.price;
        return total + parseInt(valorTotal.toString(), 10);
    }, 0);

    return (
        <>
            <div 
            role='cart'
            className='cart-container'
                style={{ transform: cart ? `translateX(0px)` : `translateX(1200px)` }}>
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
                                            <div role='increment' onClick={() => incrementQuantity(item.id)} style={{ cursor: 'pointer' }}><FaPlus size={12} /></div>
                                            <div role="quantity">{item.quantity}</div>
                                            <div role='decrement' onClick={() => decrementQuantity(item.id)} style={{ cursor: 'pointer' }}><IoMdRemove size={12} /></div>
                                        </div>
                                    </div>
                                    <div className='price-text-cart'>R${item?.valorTotal ? item?.valorTotal : parseInt(item.price).toFixed()}</div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='value'>
                    <div>Total:</div>
                    <div>R${totalPrice}</div>
                </div>
                <div className='finish'>FINALIZAR COMPA</div>
            </div>
        </>
    )
}

export default Cart;
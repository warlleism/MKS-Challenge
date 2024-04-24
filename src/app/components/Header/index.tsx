'use client'

import "./style.scss"
import { FaShoppingCart } from "react-icons/fa";
import useStore from "../../store/useStore";

const Header = () => {
    const { showCart, cartProducts } = useStore();
    return (
        <div className="container-header">
            <div className="container-titulo">
                <div>MKS</div>
                <div>Sistemas</div>
            </div>
            <div className="container-cart-info" onClick={showCart}>
                <FaShoppingCart />
                {cartProducts.length}
            </div>
        </div>
    )
}

export default Header;
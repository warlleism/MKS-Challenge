"use client";

import './style.scss'
import axios from "axios";
import useStore from "../../store/useStore";
import { useQuery } from "@tanstack/react-query";
import Cart from "../../components/Cart/Cart";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/loading";
import { FiShoppingBag } from "react-icons/fi";

export default function HomePage() {
    const { addItems, addItemCart, cartProducts } = useStore();
    const [loading, setLoading] = useState(true)

    const { data, isLoading } = useQuery({
        queryKey: "products",
        queryFn: async () => {
            const response = await axios.get("https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=DESC");
            const products = response.data.products;
            addItems(products);
            return products;
        },
        config: {
            staleTime: 1000 * 100,
        },
    });

    useEffect(() => {
        setTimeout(() => {
            setLoading(isLoading)
        }, 2000)
    })

    return (
        <>
            <Cart />
            <div className="container-product">
                <div className="container-cards">
                    {
                        loading
                            ?
                            <Loading />
                            :
                            data?.map((item, index) => {
                                return (
                                    <div className='card' key={index}>
                                        <img src={item.photo} />
                                        <div className='container-name-price'>
                                            <div>{item.name}</div>
                                            <div>R${parseInt(item.price).toFixed()}</div>
                                        </div>
                                        <div
                                            class="description-hover"
                                            onmouseover="showFullDescription(this)"
                                            onmouseout="hideFullDescription(this)">
                                            {item.description.substring(0, 80)}...
                                            <span class="full-description">{item.description}</span>
                                        </div>
                                        <button
                                            onClick={() => addItemCart(item)}
                                        >
                                            <FiShoppingBag
                                                size={17}
                                            />COMPRAR</button>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </>
    );
}

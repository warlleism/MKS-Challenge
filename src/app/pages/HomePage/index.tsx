"use client";

import './style.scss'
import axios from "axios";
import { MouseEvent } from 'react';
import useStore from "../../store/useStore";
import { useEffect, useState } from "react";
import Cart from "../../components/Cart/Cart";
import { FiShoppingBag } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/loading/loading";
import { IProducts } from '@/app/interfaces/IProducts';

// Componente HomePage
export default function HomePage() {

    const { addItemCart } = useStore();
    const [loading, setLoading] = useState(true)

    // Efeito para simular o carregamento
    useEffect(() => {
        setTimeout(() => {
            setLoading(isLoading)
        }, 2000)
    })

    // Consulta de produtos
    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get("https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=DESC");
            const products = response.data.products;
            return products;
        },
        staleTime: 1000 * 100,
    });

    // Função para mostrar descrição completa ao passar o mouse
    function showFullDescription(event: MouseEvent) {
        const descriptionHover = event.target as HTMLElement;
        const fullDescription = descriptionHover.querySelector('.full-description') as HTMLDivElement;
        if (fullDescription) {
            fullDescription.style.opacity = '1';
        }
    }

    // Função para ocultar descrição completa ao tirar o mouse
    function hideFullDescription(event: MouseEvent) {
        const descriptionHover = event.target as HTMLElement;
        const fullDescription = descriptionHover.querySelector('.full-description') as HTMLDivElement;
        if (fullDescription) {
            fullDescription.style.opacity = '0';
        }
    }

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
                            data?.map((item: IProducts, index: string) => {
                                return (
                                    <div className='card' key={index}>
                                        <img src={item.photo} />
                                        <div className='container-name-price'>
                                            <div>{item.name}</div>
                                            <div>R${parseInt(item.price).toFixed()}</div>
                                        </div>
                                        <div
                                            className="description-hover"
                                            onMouseOver={showFullDescription}
                                            onMouseOut={hideFullDescription}
                                        >
                                            {item.description.substring(0, 80)}...
                                            <span className="full-description">{item.description}</span>
                                        </div>
                                        <button onClick={() => addItemCart(Object(item))}>
                                            <FiShoppingBag size={17} />
                                            COMPRAR
                                        </button>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </>
    );
}

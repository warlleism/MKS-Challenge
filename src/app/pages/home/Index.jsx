"use client";

import axios from "axios";
import useStore from "../../store/useStore";
import { useQuery } from "@tanstack/react-query";
import Cart from "../components/Cart";

export default function HomePage() {
    const { addItems } = useStore();

    const { data, isLoading } = useQuery({
        queryKey: "products",
        queryFn: async () => {
            const response = await axios.get("https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=6&sortBy=id&orderBy=DESC");
            const products = response.data.products;
            addItems(products);
            return products;
        },
        config: {
            staleTime: 1000 * 100,
        },
    });

    return (
        <>
            <Cart />
        </>
    );
}

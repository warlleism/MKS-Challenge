import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomePage from '@/app/pages/HomePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useStore from '@/app/store/useStore';
import Header from '@/app/components/Header';

describe('HomePage Component', () => {
    const queryClient = new QueryClient();

    it('should render cart', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Header />
                <HomePage />
            </QueryClientProvider>
        );

        // Verificando se o cart está sendo renderizado
        const cart = screen.getByRole('cart');
        expect(cart).toBeInTheDocument();

        // Verificando se o botão para chamar o cart está sendo renderizado
        const show = screen.getByRole('show');
        expect(show).toBeInTheDocument();

        // Verificando se ao clicar no botão o cart aparece
        fireEvent.click(show);
        expect(cart).toHaveStyle('transform: translateX(0px)');
    });
});

describe('should increment and decrement product quantity', () => {
    const queryClient = new QueryClient();

    it('should increment quantity itens', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Header />
                <HomePage />
            </QueryClientProvider>
        );

        // Renderizando tela de loading
        const loadingElement = screen.getByRole('loading');
        expect(loadingElement).toBeInTheDocument();

        // Esperando o componente de loading parar de ser renderizado
        await waitFor(() => {
            expect(screen.queryByRole('loading')).toBeNull();
        }, { timeout: 3000 });

        // Renderizando o item após o loading
        const button = screen.getAllByRole('button');
        expect(button.length).toBeGreaterThan(0);

        // Inserindo um item no carrinho
        fireEvent.click(button[0]);
        expect(useStore.getState().cartProducts.length).toBe(1);

        // Verificando cart está visivel
        const cart = screen.getByRole('cart');
        expect(cart).toHaveStyle('transform: translateX(0px)');

        const quantity = screen.getByRole('quantity')
        expect(quantity).toBeInTheDocument()
        expect(quantity).toHaveTextContent("1")

        //Incrementando o valor (quantidade)
        const increment = screen.getByRole('increment')
        fireEvent.click(increment)
        expect(quantity).toHaveTextContent("2")

        //Decrementando o valor (quantidade)
        const decrement = screen.getByRole('decrement')
        fireEvent.click(decrement)
        expect(quantity).toHaveTextContent("1")
    });


});

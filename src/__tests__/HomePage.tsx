import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomePage from '@/app/pages/HomePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useStore from '@/app/store/useStore';

describe('HomePage Component', () => {
    const queryClient = new QueryClient();


    it('renders loading and cards after loading', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <HomePage />
            </QueryClientProvider>
        );

        //renderizando tela de loading
        const loadingElement = screen.getByRole('loading');
        expect(loadingElement).toBeInTheDocument();

        //esperando o componente de loading parar de ser renderizado
        await waitFor(() => {
            expect(screen.queryByRole('loading')).toBeNull();
        }, { timeout: 3000 });

        //renderizando o item após o loading
        const cardElements = screen.getAllByRole('cards');
        expect(cardElements.length).toBeGreaterThan(0);

    });

    it('should add new item in products array', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <HomePage />
            </QueryClientProvider>
        );

        //renderizando tela de loading
        const loadingElement = screen.getByRole('loading');
        expect(loadingElement).toBeInTheDocument();

        //esperando o componente de loading parar de ser renderizado
        await waitFor(() => {
            expect(screen.queryByRole('loading')).toBeNull();
        }, { timeout: 3000 });

        //renderizando o item após o loading
        const button = screen.getAllByRole('button');
        expect(button.length).toBeGreaterThan(0);

        //inserindo o primeiro item no carrinho
        fireEvent.click(button[0])
        expect(useStore.getState().cartProducts.length).toBe(1);

        //inserindo o segundo item no carrinho
        fireEvent.click(button[1])
        expect(useStore.getState().cartProducts.length).toBe(2);

    })
});

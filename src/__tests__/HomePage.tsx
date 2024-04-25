import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '@/app/pages/HomePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from '@/app/components/loading/loading';

describe('HomePage Component', () => {
    const queryClient = new QueryClient();


    it('renders loading and cards after loading', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <HomePage />
            </QueryClientProvider>
        );

        const loadingElement = screen.getByRole('loading');
        expect(loadingElement).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByRole('loading')).toBeNull();
        }, { timeout: 3000 });


        const cardElements = screen.getAllByRole('cards');
        expect(cardElements.length).toBeGreaterThan(0);
    });
});

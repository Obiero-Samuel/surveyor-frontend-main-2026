import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { store } from './store/store';
import './index.css';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

const ErrorFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">
                The application encountered an unexpected error. Please try refreshing the page.
            </p>
            <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Refresh Page
            </button>
        </div>
    </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <ThemeProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </ThemeProvider>
                </Provider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ErrorBoundary>
    </React.StrictMode>
);
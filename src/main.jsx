import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from "./components/Home/Home.jsx"
import SearchMovies from './components/SearchMovies/SearchMovies.jsx'
import SingleProduct from './components/SingleProduct/SingleProduct.jsx'
import FeaturedMovies from './components/FeaturedMovies/FeaturedMovies.jsx'
import SingleGenre from './components/SingleGenre/SingleGenre.jsx'
import AuthContext from './ctx/AuthContext.jsx'
import ModalsContext from './ctx/ModalsContext.jsx'
import LanguageContext from './ctx/LanguageContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            onError: (error) => {
                console.error('Query error:', error)
            }
        },
        mutations: {
            onError: (error) => {
                console.error('Mutation error:', error)
            }
        }
    }
})

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <Home />,
                errorElement: <ErrorBoundary />
            },
            {
                path: 'SearchMovies',
                element: <SearchMovies />,
                errorElement: <ErrorBoundary />
            },
            {
                path: 'SearchMovies/:id',
                element: <SingleProduct />,
                errorElement: <ErrorBoundary />
            },
            {
                path: 'FeaturedMovies',
                element: <FeaturedMovies />,
                errorElement: <ErrorBoundary />
            },
            {
                path: 'FeaturedMovies/:id',
                element: <SingleProduct />,
                errorElement: <ErrorBoundary />
            },
            {
                path: 'product/:id',
                element: <SingleProduct />,
                errorElement: <ErrorBoundary />
            },
            {
                path: ':genre/:id',
                element: <SingleGenre />,
                errorElement: <ErrorBoundary />
            },
            {
                path: ':genre/:id/:movieId',
                element: <SingleProduct />,
                errorElement: <ErrorBoundary />
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthContext>
                <ModalsContext>
                    <LanguageContext>
                        <RouterProvider router={router}/>
                    </LanguageContext>
                </ModalsContext>
            </AuthContext>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </StrictMode>,
)
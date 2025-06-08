import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from "./components/Home/Home.jsx";
import SearchMovies from './components/SearchMovies/SearchMovies.jsx'
import SingleProduct from './components/SingleProduct/SingleProduct.jsx'
import FeaturedMovies from './components/FeaturedMovies/FeaturedMovies.jsx'
import SingleGenre from './components/SingleGenre/SingleGenre.jsx'
import SignUp from "./components/SignUp/SignUp.jsx"
import SignIn from "./components/SignIn/SignIn.jsx"
import AuthContext from './ctx/AuthContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'SignIn',
                element: <SignIn/>
            },
            {
                path: 'SignUp',
                element: <SignUp/>
            },
            {
                path: 'SearchMovies',
                element: <SearchMovies/>
            },
            {
                path: 'SearchMovies/:id',
                element: <SingleProduct/>
            },
            {
                path: 'FeaturedMovies',
                element: <FeaturedMovies/>
            },
            {
                path: 'product/:id',
                element: <SingleProduct/>
            },
            {
                path: ':genre/:id',
                element: <SingleGenre/>
            },
            {
                path: 'genre/:id/:movieId',
                element: <SingleProduct/>
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthContext>
                <RouterProvider router={router}/>
            </AuthContext>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    </StrictMode>,
)
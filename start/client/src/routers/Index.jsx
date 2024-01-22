import { createBrowserRouter, redirect } from "react-router-dom"
import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";
import ChatPage from '../views/ChatPage'

const router = createBrowserRouter([
    {
        path: "*",
        loader: () => {
            return redirect('/')
        },
    },
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/login",
        element: <LoginPage />,
        loader: () => {
            if (localStorage.username) {
                return redirect('/chat')
            }

            return null
        }
    },
    {
        path: "/chat",
        element: <ChatPage />,
        loader: () => {
            if (!localStorage.username) {
                return redirect('/login')
            }

            return null
        }
    }
]);

export default router;
import { createBrowserRouter, redirect } from "react-router-dom"
import { io } from 'socket.io-client'
import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";
import ChatPage from '../views/ChatPage'

const socket = io("http://localhost:3000", {
    autoConnect: false
});
// langsung connect ke socket server
// karena event based communication jadi sama aja kyk socket.emit("connect")

const router = createBrowserRouter([
    {
        path: "*",
        loader: () => {
            return redirect('/')
        },
    },
    {
        path: "/",
        element: <HomePage socket={socket} />
    },
    {
        path: "/login",
        element: <LoginPage socket={socket} />,
        loader: () => {
            if (localStorage.username) {
                return redirect('/chat')
            }

            return null
        }
    },
    {
        path: "/chat",
        element: <ChatPage socket={socket} />,
        loader: () => {
            if (!localStorage.username) {
                return redirect('/login')
            }

            return null
        }
    }
]);

export default router;
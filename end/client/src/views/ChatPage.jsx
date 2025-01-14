import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { socket } from '../socket/socket'

export default function ChatPage() {
    const [messageSent, setMessageSent] = useState("")
    const [messages, setMessages] = useState([])
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.clear()
        navigate("/login")
    }

    function handleSubmit(e) {
        e.preventDefault()
        socket.emit("message:new", messageSent)
    }

    useEffect(() => {
        // ngeset auth buat socketnya
        socket.auth = {
            username: localStorage.username
        }

        // kenapa butuh connect manual? supaya bisa set auth dlu sblm connect
        socket.connect()

        socket.on("message:update", (newMessage) => {
            setMessages(current => {
                return [...current, newMessage]
            })
        })

        return () => {
            socket.off("message:update")
            socket.disconnect()
        }
    }, [])


    return (
        <>
            <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-base-200 text-gray-800 p-10">
                <div className="flex flex-col flex-grow w-full max-w-xl bg-base-100 shadow-xl rounded-lg overflow-hidden">
                    <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                        {messages.map(msg => {
                            return (
                                <>
                                    <div className={msg.from == localStorage.username ? "chat chat-end flex flex-col" : "chat chat-start flex flex-col"}>
                                        <div>{msg.from == localStorage.username ? "You" : msg.from}</div>
                                        <div className="chat-bubble chat-bubble-accent">{msg.message}</div>
                                    </div>
                                </>
                            )
                        })}

                    </div>
                    <form className="bg-accent p-4 flex flex-row" onSubmit={handleSubmit}>
                        <input onChange={(e) => setMessageSent(e.target.value)} className="flex items-center w-full rounded px-3" type="text" placeholder="Type your message…" />
                        <button className="btn btn-base-100 ml-4" type='submit'>Send</button>
                    </form>
                </div>
                <button className="btn btn-error mt-10 w-full max-w-xl" onClick={handleLogout}>Logout</button>
            </div>
        </>
    )
}
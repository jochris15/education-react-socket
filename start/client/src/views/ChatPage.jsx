import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ChatPage() {
    const [messageSent, setMessageSent] = useState("")
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.clear()
        navigate("/login")
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    useEffect(() => {
    }, [])


    return (
        <>
            <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-base-200 text-gray-800 p-10">
                <div className="flex flex-col flex-grow w-full max-w-xl bg-base-100 shadow-xl rounded-lg overflow-hidden">
                    <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                        <div className="chat chat-start flex flex-col">
                            <div>Raditya Dika</div>
                            <div className="chat-bubble chat-bubble-accent">Bayi ambil tanganku</div>
                        </div>
                        <div className="chat chat-end flex flex-col">
                            <div>You</div>
                            <div className="chat-bubble chat-bubble-accent">Aku mau kamu jadi suamiku</div>
                        </div>
                        <div className="chat chat-start flex flex-col">
                            <div>Raditya Dika</div>
                            <div className="chat-bubble chat-bubble-accent">Karena kamu manusia besiku</div>
                        </div>
                        <div className="chat chat-end flex flex-col">
                            <div>You</div>
                            <div className="chat-bubble chat-bubble-accent">Dan aku cinta kamu 3000</div>
                        </div>
                    </div>
                    <form className="bg-accent p-4 flex flex-row" onSubmit={handleSubmit}>
                        <input onChange={(e) => setMessageSent(e.target.value)} className="flex items-center w-full rounded px-3" type="text" placeholder="Type your message…" />
                        <button className="btn btn-base-100 ml-4" type='submit'>Send</button>
                    </form>
                </div>
                <button className="btn btn-error mt-10 w-full max-w-xl" onClick={handleLogout}>Logout</button>
            </div >
        </>
    )
}
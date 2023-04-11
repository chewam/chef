"use client"

import { type FormEvent, useState } from "react"
import { type Message, useChat } from "@/hooks/use-chat"

export default function Form() {
  const { history, addMessage, setStatus } = useChat()
  const [message, setMessage] = useState("")

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus("loading")
    const userMessage: Message = { role: "user", content: message }
    addMessage(userMessage)
    setMessage("")
    const body = JSON.stringify({ history, message })
    const result = await fetch("/api/chat", { method: "POST", body })
    const { response } = await result.json()
    addMessage({ role: "assistant", content: response })
    setStatus("ready")
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={message}
        style={{ width: "600px" }}
        onChange={({ target: { value } }) => setMessage(value)}
      />
    </form>
  )
}

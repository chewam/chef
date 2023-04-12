"use client"

import { type FormEvent, useState } from "react"
import { type Message, useChat } from "@/hooks/use-chat"
import RecorderButton from "./recorder-button"

export default function Form() {
  const [message, setMessage] = useState("")
  const { history, addMessage, setStatus } = useChat()
  // const [audioURL, setAudioURL] = useState<string | null>(null)

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

  async function handleRecordStop(audioBlob: Blob) {
    const formData = new FormData()
    formData.append("file", audioBlob)
    const response = await fetch("/api/speech", {
      method: "POST",
      body: formData,
    })
    const text = await response.text()
    console.log(text)
  }

  return (
    <div className="prompt">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
        />
      </form>
      <RecorderButton onStop={handleRecordStop} />
      {/* {audioURL && <audio src={audioURL} controls />} */}
    </div>
  )
}

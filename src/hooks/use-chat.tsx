"use client"

import {
  useMemo,
  useState,
  useContext,
  useCallback,
  createContext,
  useEffect,
} from "react"

export interface Message {
  content: string
  role: "user" | "assistant"
}

interface ChatContextValue {
  history: Message[]
  status: "ready" | "loading"
  resetMessages: () => void
  addMessage: (message: Message) => void
  setStatus: (status: "ready" | "loading") => void
}

export const ChatContext = createContext<ChatContextValue>({
  history: [],
  status: "ready",
  setStatus: () => null,
  addMessage: () => null,
  resetMessages: () => null,
})

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<Message[]>([])
  const [initialized, setInitialized] = useState<boolean>(false)
  const [status, setStatus] = useState<"ready" | "loading">("ready")

  const addMessage = useCallback((message: Message) => {
    setHistory((messages) => [...messages, message])
  }, [])

  const resetMessages = () => {
    setHistory([])
  }

  useEffect(() => {
    const history = localStorage.getItem("history")
    if (history) {
      setHistory(JSON.parse(history))
    }
    setInitialized(true)
  }, [])

  useEffect(() => {
    if (initialized) {
      localStorage.setItem("history", JSON.stringify(history))
    }
  }, [history, initialized])

  const contextValue = useMemo(
    () => ({
      status,
      history,
      setStatus,
      addMessage,
      resetMessages,
    }),
    [status, history, setStatus, addMessage]
  )

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  )
}

export const useChat = (): ChatContextValue => useContext(ChatContext)

"use client"

import { useChat } from "@/hooks/use-chat"

export default function Messages() {
  const { history } = useChat()

  return (
    <ul>
      {history.map(({ role, content }, i) => (
        <li key={i} className={role}>
          {content}
        </li>
      ))}
    </ul>
  )
}

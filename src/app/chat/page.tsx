import { ChatProvider } from "@/hooks/use-chat"
import Form from "@/ui/form"
import Messages from "@/ui/messages"

export default function Page() {
  return (
    <main>
      <ChatProvider>
        <Form />
        <Messages />
      </ChatProvider>
    </main>
  )
}

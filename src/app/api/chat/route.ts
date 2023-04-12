import { Model } from "@chewam/mozart"

export async function POST(request: Request) {
  const { history, message } = await request.json()
  const model = new Model({ model: "gpt-3.5-turbo" })
  const { content: response } = await model.use({ history, message })
  return new Response(JSON.stringify({ response }))
}

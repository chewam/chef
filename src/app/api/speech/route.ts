import { Readable } from "stream"
import { OpenAIApi, Configuration } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  const formData = await request.formData()
  const blob = formData.get("file") as Blob

  const reader = blob.stream().getReader()

  const readable = new Readable({
    async read() {
      const { value, done } = await reader.read()
      if (done) {
        this.push(null)
      } else {
        this.push(Buffer.from(value))
      }
    },
  }) as unknown as File

  // @ts-expect-error: "openai.createTranscription" requires a useless path here
  readable.path = "audio.mp3"

  const openai = new OpenAIApi(configuration)

  try {
    const { data } = await openai.createTranscription(
      readable,
      "whisper-1",
      "", // prompt
      "verbose_json",
      0.8,
      "fr",
      { maxContentLength: Infinity, maxBodyLength: Infinity }
    )

    return new Response(data.text)
  } catch (error) {
    console.log(error)
    return new Response("")
  }
}

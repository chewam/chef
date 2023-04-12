import useRecorder from "@/hooks/use-recorder"
import { useEffect } from "react"

export default function RecorderButton({
  onStop,
}: {
  onStop: (audioBlob: Blob) => void
}) {
  const { isRecording, startRecording, stopRecording, audioBlob, volume } =
    useRecorder()

  const handleClick = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  useEffect(() => {
    if (audioBlob) {
      onStop(audioBlob)
    }
  }, [audioBlob])

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: `rgba(0, 0, 0, ${volume / 25.5})`,
      }}
    >
      {isRecording ? "Arrêter l'enregistrement" : "Démarrer l'enregistrement"}
    </button>
  )
}

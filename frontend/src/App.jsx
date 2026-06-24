import { useState } from "react"
import axios from "axios"
import jsPDF from "jspdf"

function App() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const upload = async () => {
    if (!file) {
      alert("Select Resume First")
      return
    }

    setLoading(true)
    setResult("")

    const form = new FormData()
    form.append("file", file)

    try {
      const res = await axios.post(
        "https://ai-career-os-api.onrender.com/upload",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      setResult(res.data.resume_text)
    } catch (err) {
      console.log(err)

      setResult(
        "Analysis Failed. Check backend deployment or API key."
      )
    }

    setLoading(false)
  }

  const download = () => {
    if (!result) {
      alert("No report available")
      return
    }

    const pdf = new jsPDF()

    pdf.setFontSize(22)
    pdf.text("AI Career OS Report", 20, 20)

    pdf.setFontSize(11)

    const lines = pdf.splitTextToSize(result, 170)

    pdf.text(lines, 20, 40)

    pdf.save("AI_Career_Report.pdf")
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right,#020617,#071952,#020617)",
        color: "white",
        padding: "50px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            fontSize: "65px",
            marginBottom: "10px",
          }}
        >
          🚀 AI Career OS
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "22px",
            marginBottom: "40px",
          }}
        >
          Upload your resume and receive AI-powered ATS analysis
        </p>

        <div
          style={{
            background: "#172554",
            padding: "40px",
            borderRadius: "20px",
            marginBottom: "40px",
          }}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          <br />
          <br />

          <button
            onClick={upload}
            disabled={loading}
            style={{
              padding: "18px 30px",
              border: "none",
              borderRadius: "12px",
              background: "#2563eb",
              color: "white",
              fontSize: "22px",
              cursor: "pointer",
              marginRight: "20px",
            }}
          >
            {loading
              ? "⏳ Analyzing..."
              : "🔍 Analyze Resume"}
          </button>

          <button
            onClick={download}
            style={{
              padding: "18px 30px",
              border: "none",
              borderRadius: "12px",
              background: "#16a34a",
              color: "white",
              fontSize: "22px",
              cursor: "pointer",
            }}
          >
            📄 Download Report
          </button>
        </div>

        <div
          style={{
            background: "#172554",
            padding: "40px",
            borderRadius: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "45px",
              marginBottom: "20px",
            }}
          >
            📊 Analysis Report
          </h2>

          <hr />

          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "2",
              fontSize: "18px",
              marginTop: "20px",
            }}
          >
            {result || "Waiting for resume upload..."}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
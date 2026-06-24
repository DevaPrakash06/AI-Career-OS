import { useState } from "react"
import axios from "axios"
import jsPDF from "jspdf"

function App() {

const [file,setFile]=useState(null)

const [result,setResult]=useState("")

const [loading,setLoading]=useState(false)

const upload=async()=>{

if(!file){

alert("Select Resume PDF")

return

}

setLoading(true)

const form=
new FormData()

form.append(
"file",
file
)

try{

const res=
await axios.post(
"http://127.0.0.1:8000/upload",
form
)

setResult(
res.data.resume_text
)

}

catch(error){

console.log(error)

alert(
"Analysis Failed"
)

}

setLoading(false)

}

const download=()=>{

if(!result){

alert(
"Generate report first"
)

return

}

const pdf=
new jsPDF()

pdf.setFontSize(22)

pdf.text(
"AI Career OS Report",
20,
20
)

pdf.setFontSize(11)

const lines=
pdf.splitTextToSize(
result,
170
)

pdf.text(
lines,
20,
40
)

pdf.save(
"Resume_Report.pdf"
)

}

return(

<div
style={{

background:
"linear-gradient(to right,#0f172a,#111827)",

minHeight:
"100vh",

padding:
"40px",

color:
"white",

fontFamily:
"Arial"

}}
>

<div
style={{

maxWidth:
"900px",

margin:
"auto"

}}
>

<h1
style={{

fontSize:
"48px",

marginBottom:
"10px"

}}
>

🚀 AI Career OS

</h1>

<p
style={{

opacity:
0.8,

marginBottom:
"30px"

}}
>

Upload your resume and receive AI-powered ATS analysis

</p>

<div
style={{

background:
"#1e293b",

padding:
"30px",

borderRadius:
"20px",

boxShadow:
"0 0 30px rgba(0,0,0,.4)"

}}
>

<input

type="file"

accept=".pdf"

onChange={
(e)=>

setFile(
e.target.files[0]
)
}

style={{

padding:
"12px",

width:
"100%",

marginBottom:
"20px"

}}

/>

<button

onClick={
upload
}

style={{

padding:
"14px",

background:
"#2563eb",

color:
"white",

border:
"none",

borderRadius:
"10px",

fontSize:
"18px",

cursor:
"pointer",

marginRight:
"15px"

}}

>

{

loading

?

"⏳ Analyzing..."

:

"🔍 Analyze Resume"

}

</button>

<button

onClick={
download
}

style={{

padding:
"14px",

background:
"#16a34a",

color:
"white",

border:
"none",

borderRadius:
"10px",

fontSize:
"18px",

cursor:
"pointer"

}}

>

📄 Download Report

</button>

</div>

<br/>

<div
style={{

background:
"#1e293b",

padding:
"30px",

borderRadius:
"20px",

boxShadow:
"0 0 30px rgba(0,0,0,.3)"

}}
>

<h2>

📊 Analysis Report

</h2>

<hr/>

<div
style={{

whiteSpace:
"pre-wrap",

lineHeight:
"1.8",

fontSize:
"17px",

marginTop:
"20px"

}}
>

{

result

.replaceAll(
"###",
""
)

.replaceAll(
"**",
""
)

}

</div>

</div>

</div>

</div>

)

}

export default App
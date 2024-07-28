import axios from "axios";
const apikey=import.meta.env.VITE_API_KEY;
export async function GeminiApi(input) {
    const res= await axios({
        url:`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apikey}`,
        method:"post",
        data:
        {
            "contents":[
            {
                "parts":[{"text":input}]
            }
            ]
        }
    })
    return res.data.candidates[0].content.parts[0].text;
}

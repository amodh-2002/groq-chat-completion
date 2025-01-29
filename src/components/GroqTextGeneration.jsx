import React, { useState } from "react"
import Groq from "groq-sdk";
import './GroqTextGeneration.css'

function GroqTextGeneration(){
    const [input,setInput] = useState("")
    const [response, setResponse] = useState("")

    const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true});

    const handleSubmit = async (event)=> {
        event.preventDefault()

        if (input.trim() === "") return

        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                  {
                    role: "user",
                    content: input
                  },
                ],
                model: "deepseek-r1-distill-llama-70b",
                temperature: 0.5,
                max_completion_tokens: 1024,
                top_p:1,
                stream:false,
                stop:null
              });
            setResponse(chatCompletion.choices[0]?.message?.content || "")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <h1>Groq LLM Chat</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    placeholder="Enter your message.."
                    onChange={(event) => setInput(event.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
    
            {response && (
                <div className="response">
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
    
}

export default GroqTextGeneration
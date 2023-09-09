const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')

dotenv.config()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
    );
})

const apiKey = process.env.OPENAI_API_KEY
const PORT = process.env.PORT || 5000

app.post('/convert', async (req, res) => {
    const inputCode = req.body.inputCode
    const inputLanguage = req.body.inputLanguage
    const outputLanguage = req.body.outputLanguage

    var prompt
    if (inputLanguage === 'Natural Language') {
        prompt = `
        You are an expert programmer in all programming languages.
        Translate the natural language to "${outputLanguage}" code.
        Do not include \`\`\`.

        Example translating from natural language to JavaScript:

        Natural language:
        Print the numbers 0 to 9.

        JavaScript code:
        for(let i = 0; i < 10; i++){
            console.log(i)
        }

        Natural language:
        ${inputCode}

        ${outputLanguage} code (no \`\`\`):
        `
    } else if (outputLanguage === 'Natural Language') {
        prompt = `
        You are an expert programmer in all programming languages.
        Translate the "${inputLanguage}" code to natural language in plain english
        that an average adult could understand. Respond as bullet points starting with -.

        Example translating from JavaScript to natural language:

        JavaScript code:
        for(let i = 0; i < 10; i++){
            console.log(i)
        }

        Natural language:
        Print the numbers 0 to 9.

        ${inputLanguage} code:
        ${inputCode}

        Natural language (no \`\`\`):
        `
    } else {
        prompt = `
        You are an expert programmer in all programming languages.
        Translate the "${inputLanguage}" code to "${outputLanguage}" code.
        Do not include \`\`\`

        Example translating from JavaScript to Python:

        JavaScript code:
        for(let i = 0; i < 10; i++){
            console.log(i)
        }

        Python code:
        for i in range(10):
            print(i)

        ${inputLanguage} code:
        ${inputCode}

        ${outputLanguage} code (no \`\`\`): 
        `
    }
    // console.log(prompt)
    try {
        const response = await fetch(`https://api.openai.com/v1/chat/completions`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                method: 'POST',
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'system', content: prompt }],
                    max_tokens: 200
                })
            })
        const data = await response.json()
        console.log(data)
        res.send(data)
    } catch (error) {
        console.error(error)
    }
})

app.listen(PORT, console.log(`Server started on PORT ${PORT}`))
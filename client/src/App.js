import { Box, Heading, Text } from "@chakra-ui/react";
import CodeWindow from "./components/CodeWindow";
import { useState } from "react";
import { useToast } from '@chakra-ui/react'
import './App.css';

const App = () => {

  const [loading, setLoading] = useState(false)
  const [inputCode, setInputCode] = useState('')
  const [outputCode, setOutputCode] = useState('')
  const [inputLanguage, setInputLanguage] = useState('JavaScript')
  const [outputLanguage, setOutputLanguage] = useState('TypeScript')
  const toast = useToast()


  const handleInputLanguageChange = (option) => {
    console.log("Input: " + option.target.value)
    setInputLanguage(option.target.value)
    setInputCode('')
    setOutputCode('')
  }

  const handleOutputLanguageChange = (option) => {
    console.log("Output: " + option.target.value)
    setOutputLanguage(option.target.value)
    setOutputCode('')
  }

  const handleTranslate = async () => {
    const maxLength = 6000
    if (inputLanguage === outputLanguage) {
      toast({
        title: 'Input and Output languages can not be the same.',
        status: 'error',
        duration: 3000,
        variant: 'left-accent',
        position: 'top',
        isClosable: true,
      })
      return
    }

    if (!inputCode) {
      toast({
        title: 'Please enter some code.',
        status: 'info',
        duration: 3000,
        variant: 'left-accent',
        position: 'top',
        isClosable: true,
      })
      return
    }

    if (inputCode.length > maxLength) {
      toast({
        title: `Please enter code less than ${maxLength} characters.`,
        description: `You're currently at ${inputCode.length} characters.`,
        status: 'warning',
        duration: 3000,
        variant: 'left-accent',
        position: 'top',
        isClosable: true,
      })
      return
    }

    setLoading(true)
    setOutputCode('')

    const options = {
      method: 'POST',
      body: JSON.stringify({
        inputCode,
        inputLanguage,
        outputLanguage
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await fetch('/convert', options)
      const data = await response.json()
      console.log(data)
      setLoading(false)

      // console.log("before" + outputCode)
      setOutputCode(data.choices[0].message.content)
      // console.log("after" + outputCode)
    } catch (err) {
      toast({
        title: 'Error Occured while translating code',
        description: err,
        status: 'error',
        duration: 3000,
        variant: 'left-accent',
        position: 'top',
        isClosable: true,
      })
      setLoading(false)
    }
  }
  return (
    <div className="App">
      <Box className="box1">
        <Heading className="heading">AI Code Translator</Heading>
        <Text>Translate your code to another Programming language. With just a click</Text>
      </Box>
      <Box className="box">
        <CodeWindow code={inputCode} setCode={setInputCode} loading={loading} language={inputLanguage} handleLanguageChange={handleInputLanguageChange} />
        <CodeWindow code={outputCode} setCode={setOutputCode} loading={loading} language={outputLanguage} handleLanguageChange={handleOutputLanguageChange} />
      </Box>
      <button className="btn" onClick={handleTranslate}>{loading ? `Translating...` : `Translate🔁`}</button>
    </div>
  );
}

export default App;

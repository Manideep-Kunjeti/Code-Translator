import React, { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { draculaInit } from '@uiw/codemirror-theme-dracula'
import { tags as t } from '@lezer/highlight';
import { StreamLanguage } from '@codemirror/language'
import { go } from '@codemirror/legacy-modes/mode/go'
import { javascript } from '@codemirror/legacy-modes/mode/javascript'
import '../App.css';
import { useToast } from '@chakra-ui/react';

const containerStyle = {
    position: 'relative'
}

// const elementStyle = {
//     // backgroundColor: '#f0f0f0',
//     // marginTop: '40px',
//     zIndex: 1,
// }

const buttonStyle = {
    position: 'absolute',
    zIndex: 2,
    right: '0.1vw'
}

const CodeEditor = ({ code = '', setCode, editable = false, language }) => {
    const toast = useToast()
    const [copyText, setCopyText] = useState('Copy')

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCopyText('Copy')
        }, 2000)
        return () => clearTimeout(timeout)
    }, [copyText])

    const config = {
        lineNumbers: true,
        model: language,
        indentUnit: 4,
        smartIndent: true,
        indentWithTabs: false,
        electricChars: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        extraKeys: { 'Ctrl- Space': 'autocomplete' },
        indent: { auto: true }
    }

    return (
        <div style={containerStyle}>
            <div style={buttonStyle}>
                <button
                    style={{
                        backgroundColor: '#C53AAE',
                        padding: '3.5px',
                        fontSize: '12px',
                        color: 'white',
                        float: 'left',
                    }}
                    onClick={() => {
                        navigator.clipboard.writeText(code)
                        setCopyText("Copied!")
                        toast({
                            title: 'Code copied successfully!!',
                            status: 'success',
                            duration: 3000,
                            variant: 'left-accent',
                            position: 'top',
                            isClosable: true,
                        })
                    }}>{copyText}</button>
            </div>


            <div style={{ border: '2px solid black', borderRadius: '0 0 0.5rem 0.5rem' }}>
                <CodeMirror
                    padding='0px'
                    className='rounded-b-xl'
                    editable={editable}
                    value={code}
                    minHeight='300px'
                    maxHeight='300px'
                    config={config}
                    theme={draculaInit({
                        settings: {
                            caret: '#06c6c6'
                        },
                        styles: [
                            { tag: t.comment, color: '#6272a4', 'z-index': '2' },
                        ]
                    })}
                    extensions={[StreamLanguage.define(javascript)]}
                    onChange={(value) => setCode(value)}
                />
            </div>
        </div>
    )
}

export default CodeEditor

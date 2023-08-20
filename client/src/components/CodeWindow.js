import React from 'react'
import CodeEditor from './CodeEditor'
import LanguageSelect from './LanguageSelect'

const CodeWindow = ({ code, setCode, loading, language, handleLanguageChange }) => {
    return (
        <div style={{ width: '40vw' }}>
            <LanguageSelect language={language} handleLanguageChange={handleLanguageChange} disabled={loading} />
            <CodeEditor code={code} setCode={setCode} language={language} editable={!loading} />
        </div>
    )
}

export default CodeWindow

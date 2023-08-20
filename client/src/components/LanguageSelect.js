import { Select } from '@chakra-ui/react'
import React from 'react'

const LanguageSelect = ({ language, handleLanguageChange, disabled }) => {
    return (
        <div>
            <Select
                width='100%'
                border='2px solid black'
                borderRadius='0.5rem 0.5rem 0 0'
                variant='Outline'
                placeholder={language}
                // value={{ label: language, value: language }}
                onChange={handleLanguageChange}
                isDisabled={disabled}
                color={'black'}
            >
                <option value='C'>C</option>
                <option value='C++'>C++</option>
                <option value='Go'>Go</option>
                <option value='Java'>Java</option>
                <option value='JavaScript'>JavaScript</option>
                <option value='JSX'>JSX</option>
                <option value='NoSQL'>NoSQL</option>
                <option value='Natural Language'>Natural Language</option>
                <option value='PHP'>PHP</option>
                <option value='PL/SQL'>PL/SQL</option>
                <option value='Python'>Python</option>
                <option value='R'>R</option>
                <option value='SQL'>SQL</option>
                <option value='TSX'>TSX</option>
                <option value='TypeScript'>TypeScript</option>

            </Select>
        </div >
    )
}

export default LanguageSelect

import React, { useState } from 'react'
import './search.scss'

interface Props {
    placeholder?: string
    onSearchSubmit?: any
}

const Search = (props: Props) => {
    const [isFocused, setIsFocused] = useState(false)
    const [value, setValue] = useState('')
    const handleSearchChange = (e: any) => {
        setValue(e.target.value)

        if (e.key !== 'Enter') {
            return false
        }

        return props.onSearchSubmit(value)
    }

    const handleOnClick = () => {
        if (!value) {
            return false
        }

        return props.onSearchSubmit(value)
    }

    return (
        <div
            className={`rd-search ${isFocused ? 'rd-search--focused' : ''} ${
                value ? 'rd-search--has-value' : ''
            }`}
        >
            <input
                className="rd-search__input"
                type="text"
                autoComplete="false"
                placeholder={props.placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyUp={handleSearchChange}
            />
            <button onClick={handleOnClick} className="rd-search__submit">
                Go
            </button>
        </div>
    )
}

export default Search

import React, { useState } from 'react'
import './search.scss'

interface Props {
    placeholder?: string
    onSearchChange?: any
}

const Search = (props: Props) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className={`rd-search ${isFocused ? 'rd-search--focused' : ''}`}>
            <input
                className="rd-search__input"
                type="text"
                autoComplete="false"
                placeholder={props.placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={props.onSearchChange}
            />
        </div>
    )
}

export default Search

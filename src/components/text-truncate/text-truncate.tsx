import React, { FunctionComponent, useState } from 'react'
import { truncate } from 'util/generic'
import './text-truncate.scss'

interface Props {
    truncateAfter: number
    text: string
}

const TextTruncate: FunctionComponent<Props> = ({
    truncateAfter,
    text,
    children,
}) => {
    const [isTruncated, setIsTruncated] = useState(true)
    const truncated = truncate(text, truncateAfter)

    return (
        <div
            className={`rd-text-truncate ${
                isTruncated ? 'rd-text-truncate--active' : ''
            }`}
        >
            <div className="rd-text-truncate__text">
                {isTruncated ? truncated : text}{' '}
                <span
                    className="rd-text-truncate__see"
                    onClick={() => setIsTruncated(!isTruncated)}
                >
                    See {isTruncated ? 'More' : 'Less'}
                </span>
            </div>
        </div>
    )
}

export default TextTruncate

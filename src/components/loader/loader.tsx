import React from 'react'
import Icon from 'assets/images/reactdota-loader.svg'
import './loader.scss'

const Loader = () => {
    return (
        <div className="rd-loader">
            <div className="rd-loader__background"></div>
            <div className="rd-loader__icon">
                <img src={Icon} alt="React Dota - Loading" />
            </div>
        </div>
    )
}

export default Loader

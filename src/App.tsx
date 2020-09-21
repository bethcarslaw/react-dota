import React, { useEffect } from 'react'
import logo from './assets/images/reactdota.svg'
import Loader from './components/loader/loader'
import Header from './components/header/header'
import Search from './components/search/search'
import './assets/styles/root.scss'
import { CSSTransition } from 'react-transition-group'
import { useDispatch, useSelector } from 'react-redux'
import {
    getHeroStats,
    selectFetchingHeroes,
    setHeroFilter,
} from 'reducers/heroes'
import Home from './views/home'
import Hero from './views/hero'
import './App.scss'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
    const loading = useSelector(selectFetchingHeroes)
    const dispatch = useDispatch()
    const nodeRef = React.useRef(null)

    useEffect(() => {
        dispatch(getHeroStats())
    }, [dispatch])

    const handleSearch = (e: any) => {
        dispatch(setHeroFilter(e.target.value))
    }

    return (
        <Router>
            <div className="react-dota">
                <Header
                    left={
                        <div>
                            <Link to="/">
                                <img src={logo} alt="React Dota" />
                            </Link>
                        </div>
                    }
                    right={
                        <Search
                            placeholder={'Search heroes...'}
                            onSearchChange={handleSearch}
                        />
                    }
                />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route path="/heroes/:id?">
                        <Hero />
                    </Route>
                </Switch>
                <CSSTransition
                    in={loading}
                    timeout={600}
                    classNames="fade"
                    appear
                    unmountOnExit
                    nodeRef={nodeRef}
                >
                    <Loader />
                </CSSTransition>
            </div>
        </Router>
    )
}

export default App

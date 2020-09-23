import React, { useEffect, useState } from 'react'
import logo from './assets/images/reactdota.svg'
import Loader from './components/loader/loader'
import Header from './components/header/header'
import Search from './components/search/search'
import './assets/styles/root.scss'
import { CSSTransition } from 'react-transition-group'
import { useDispatch, useSelector } from 'react-redux'
import { getHeroStats, selectFetchingHeroes } from 'reducers/heroes'
import Home from './views/home'
import Hero from './views/hero'
import Heroes from './views/heroes'
import './App.scss'
import {
    Switch,
    Route,
    Link,
    NavLink,
    Redirect,
    useHistory,
} from 'react-router-dom'
import { useQuery } from './util/custom-hooks'
import Burger from './components/burger/burger'
import OffscreenMenu from './components/offscreen-menu/offscreen-menu'

function App() {
    const loading = useSelector(selectFetchingHeroes)
    const dispatch = useDispatch()
    const query = useQuery()
    const history = useHistory()
    const nodeRef = React.useRef(null)
    const [showNav, setShowNav] = useState(false)

    useEffect(() => {
        dispatch(getHeroStats())
    }, [dispatch])

    const handleSearch = (filter: string) => {
        if (filter) {
            if (showNav) {
                setShowNav(false)
            }
            history.push(`/heroes?name=${filter}`)
        }
    }

    return (
        <div className="react-dota">
            <Header
                className="rd-topbar"
                left={
                    <div className="rd-nav">
                        <Link to="/">
                            <img src={logo} alt="React Dota" />
                        </Link>
                        <nav className="rd-nav__items">
                            <NavLink
                                to="/"
                                className="rd-nav__item"
                                activeClassName="rd-nav__item--active"
                                exact
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/heroes"
                                className="rd-nav__item"
                                activeClassName="rd-nav__item--active"
                                exact
                            >
                                Heroes
                            </NavLink>
                        </nav>
                    </div>
                }
                right={
                    <div className="display--flex rd-flex--end">
                        <Search
                            placeholder={'Search heroes...'}
                            onSearchSubmit={handleSearch}
                        />
                        <Burger
                            active={showNav}
                            onClick={() => setShowNav(!showNav)}
                        />
                    </div>
                }
            />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route exact path="/heroes">
                    <Heroes filter={query.get('name')} />
                </Route>

                <Route path="/heroes/:id?">
                    <Hero />
                </Route>

                <Route path="*">
                    <Redirect to="/"></Redirect>
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

            {showNav && (
                <OffscreenMenu>
                    <Search
                        placeholder={'Search heroes...'}
                        onSearchSubmit={handleSearch}
                        className="rd-margin--bottom"
                    />
                    <nav className="rd-mobile-menu">
                        <NavLink
                            to="/"
                            className="rd-nav__item"
                            activeClassName="rd-nav__item--active"
                            onClick={() => setShowNav(!showNav)}
                            exact
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/heroes"
                            className="rd-nav__item"
                            activeClassName="rd-nav__item--active"
                            onClick={() => setShowNav(!showNav)}
                            exact
                        >
                            Heroes
                        </NavLink>
                    </nav>
                </OffscreenMenu>
            )}
        </div>
    )
}

export default App

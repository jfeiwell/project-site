import React from 'react'
import ReactDOM from 'react-dom'
import './index.css' 
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'

const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))

//Component, 3 aspects to it 
// 1) State it manages
// 2) Lifecycle (fetching data or events?)
// 3) UI => render with return what the UI will look like

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            theme: 'light',
            toggleTheme: () => {
                this.setState(({ theme }) => ({
                    theme: theme === 'light' ? 'dark' : 'light'
                }))
            }
        }
    }

    render () {
        return (
          <Router>
            <ThemeProvider value={this.state}>
              <div className={this.state.theme}>
                <div className='container'>
                    <Nav />
                      <React.Suspense fallback={<Loading />}>
                        <Switch>
                            <Route exact path='/' component={Popular} />
                            <Route exact path='/battle' component={Battle} />
                            <Route path='/battle/results' component={Results}/>
                            <Route render={() => <h1>404 Not Found!</h1>}/>
                        </Switch>
                      </React.Suspense>
                </div>
              </div>
            </ThemeProvider>
          </Router>
        )
    }
}

ReactDOM.render(
    //takes a react element, then where to render the element to
    <App />,
    document.getElementById('app')
)

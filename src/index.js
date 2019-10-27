import React,{lazy,Suspense} from 'react'
import { render } from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from './context'
import PageLoading from './component/pageloading'
import '../public/index.css'

const Container = lazy(()=> import('./container'))
render(
    <Provider>
        <Router>
            <Suspense fallback={ <PageLoading/> }>
                <Container/>
            </Suspense>
        </Router>
    </Provider>,
    document.getElementById('root')
)
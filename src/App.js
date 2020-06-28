import React from 'react'
import Layout from './Hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import './App.css'

function App() {

  return <div className="App">
    <Layout>
      <BurgerBuilder></BurgerBuilder>
    </Layout>

  </div>
}

export default App

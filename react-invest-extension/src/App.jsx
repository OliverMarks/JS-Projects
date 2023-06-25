import { useState } from 'react'
import Card from './components/Card'

import './index.css'

function App() {
  

  return (
<div className='flex'>

  
    <Card
    coin = {'dogecoin'}
    coinOwned = {'748.5'} />
    <Card
    coin = {'ripple'}
    coinOwned = {'368.3'} />
    <Card
    coin = {'vechain'}
    coinOwned ={'3307.5'} />

    </div>
  )
}

export default App

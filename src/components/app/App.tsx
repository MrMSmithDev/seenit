import Header from '@components/header'
import React from 'react'

import styles from './App.module.scss'

const App: React.FC = () => {
  return (
    <div className={styles.appWrapper}>
      <Header />
      <p>Hello world</p>
    </div>
  )
}

export default App

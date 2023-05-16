import Header from '@components/header'
import LandingPage from '@components/landingPage'
import Main from '@components/main'
import PostFeed from '@components/posting/postFeed'
import UserBar from '@components/userBar'
import React from 'react'

import styles from './App.module.scss'

const App: React.FC = () => {
  const authStatus = false

  if (!authStatus) return <LandingPage />

  return (
    <div className={styles.appWrapper}>
      <Header />
      <Main>
        <UserBar />
        <PostFeed />
      </Main>
    </div>
  )
}

export default App

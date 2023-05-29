import Header from '@components/header'
import LandingPage from '@components/pages/landingPage'
import Main from '@components/main'
import UserBar from '@components/userBar'
import React, { useEffect, useState } from 'react'
import useAuth from '@hooks/useAuth'

import styles from './App.module.scss'
import { logo } from '@assets/images'
import { BrowserRouter } from 'react-router-dom'
import { PostRoutes } from '@routes/posts'

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    setIsLoading(!isLoading)
  }, [])

  if (isLoading)
    return (
      <div className={styles.loading}>
        <img src={logo} alt="Seenit logo" />
      </div>
    )

  if (!user) return <LandingPage />

  return (
    <BrowserRouter>
      <div className={styles.appWrapper}>
        <Header />
        <Main>
          <UserBar />
          <PostRoutes />
        </Main>
      </div>
    </BrowserRouter>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from '@components/header'
import Loading from '@components/loading'
import Main from '@components/main'
import LandingPage from '@components/pages/landingPage'
import UserBar from '@components/userBar'
import CurrentUserInfo from '@components/users/currentUserInfo'
import useAuth from '@hooks/useAuth'
import { PostRoutes } from '@routes/posts'

import styles from './App.module.scss'

const App: React.FC = () => {
  // Initiate loading screen properly here
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    setIsLoading(false)
  })

  if (isLoading) return <Loading />

  if (!user) return <LandingPage />
  else
    return (
      <BrowserRouter>
        <div className={styles.appWrapper}>
          <Header />
          <Main>
            <UserBar />
            <PostRoutes />
            <CurrentUserInfo />
          </Main>
        </div>
      </BrowserRouter>
    )
}

export default App

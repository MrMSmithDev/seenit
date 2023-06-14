import Header from '@components/header'
import LandingPage from '@components/pages/landingPage'
import Main from '@components/main'
import UserBar from '@components/userBar'
import React, { useEffect, useState } from 'react'
import useAuth from '@hooks/useAuth'

import styles from './App.module.scss'
import { BrowserRouter } from 'react-router-dom'
import { PostRoutes } from '@routes/posts'
import Loading from '@components/loading'
import CurrentUserInfo from '@components/users/currentUserInfo'

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

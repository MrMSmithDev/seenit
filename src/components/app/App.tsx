import Header from '@components/header'
import LandingPage from '@components/landingPage'
import Main from '@components/main'
import PostFeed from '@components/posting/postFeed'
import UserBar from '@components/userBar'
import React, { useEffect, useState } from 'react'
import useAuth from '@hooks/useAuth'

import styles from './App.module.scss'
import { logo } from '@assets/images'
// import NewPostForm from '@components/posting/newPostForm'

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { isUserSignedIn } = useAuth()

  useEffect(() => {
    setIsLoading(!isLoading)
  }, [])

  if (isLoading)
    return (
      <div className={styles.loading}>
        <img src={logo} alt="Seenit logo" />
      </div>
    )

  if (!isUserSignedIn()) return <LandingPage />

  return (
    <div className={styles.appWrapper}>
      <Header />
      <Main>
        <UserBar />
        {/* <NewPostForm /> */}
        <PostFeed />
      </Main>
    </div>
  )
}

export default App

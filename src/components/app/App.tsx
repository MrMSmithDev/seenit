import Header from '@components/header'
import LandingPage from '@components/landingPage'
import Main from '@components/main'
import PostFeed from '@components/posting/postFeed'
import UserBar from '@components/userBar'
import React from 'react'
import useAuth from '@hooks/useAuth'

import styles from './App.module.scss'
// import NewPostForm from '@components/posting/newPostForm'

const App: React.FC = () => {
  const { isUserSignedIn } = useAuth()

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

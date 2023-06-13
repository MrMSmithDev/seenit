import { useAuth } from '@hooks/index'
import React, { useEffect, useState } from 'react'
import Loading from '@components/loading'
import { UserType } from 'src/customTypes/types'

import style from './CurrentUserInfo.module.scss'

const CurrentUserInfo: React.FC = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)
  const [currentUser, setCurrentUser] = useState<UserType>({
    uid: '',
    displayName: '',
    photoURL: ''
  })

  useEffect(() => {
    if (user) {
      setCurrentUser(user as UserType)
      setLoading(false)
    }
  })

  if (loading) return <Loading />

  return (
    <div className={style.currentUserContainer}>
      <img src={currentUser.photoURL}></img>
    </div>
  )
}

export default CurrentUserInfo

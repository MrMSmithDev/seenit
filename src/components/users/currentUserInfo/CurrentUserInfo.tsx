import { useAuth, useUsers } from '@hooks/index'
import React, { useEffect, useState } from 'react'
import Loading from '@components/loading'
import { UserType } from 'src/customTypes/types'

import style from './CurrentUserInfo.module.scss'

const CurrentUserInfo: React.FC = () => {
  const { user } = useAuth()
  const { getUsersFavoriteCount, loadUserProfile } = useUsers()
  const [loading, setLoading] = useState<boolean>(true)
  const [currentUser, setCurrentUser] = useState<UserType>({
    uid: '',
    displayName: '',
    photoURL: ''
  })

  useEffect(() => {
    if (user) {
      const loadProfile = async () => {
        const activeUser = await loadUserProfile(user.uid)
        setCurrentUser(activeUser)
        setLoading(false)
      }

      loadProfile()
    }
  }, [user])

  if (loading) return <Loading />

  return (
    <div className={style.currentUserContainer}>
      <img className={style.userImg} src={currentUser.photoURL} referrerPolicy="no-referrer" />
    </div>
  )
}

export default CurrentUserInfo

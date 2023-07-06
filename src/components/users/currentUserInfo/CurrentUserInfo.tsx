import { useAuth, useUsers } from '@hooks/index'
import React, { useEffect, useState } from 'react'
import Loading from '@components/loading'
import { UserType } from 'src/customTypes/types'
import { Link } from 'react-router-dom'

import style from './CurrentUserInfo.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const CurrentUserInfo: React.FC = () => {
  const { user } = useAuth()
  const { getUsersFavoriteCount, setProfileListener } = useUsers()

  const [loading, setLoading] = useState<boolean>(true)
  const [usersFavoriteCount, setUsersFavoriteCount] = useState<number>(0)
  const [currentUser, setCurrentUser] = useState<UserType>({
    uid: '',
    displayName: '',
    photoURL: '',
    blurb: ''
  })

  useEffect(() => {
    if (user) {
      const updateCurrentUser = (userData: UserType) => {
        setCurrentUser(userData)
      }

      setProfileListener(user.uid, updateCurrentUser)
      if (currentUser) setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      const loadFavoriteCount = async () => {
        const favoriteCount: number = await getUsersFavoriteCount(user.uid)
        setUsersFavoriteCount(favoriteCount)
      }

      loadFavoriteCount()
    }
  })

  if (loading) return <Loading />

  return (
    <div className={style.currentUserContainer}>
      <img className={style.userImg} src={currentUser.photoURL} referrerPolicy="no-referrer" />
      <h1 className={style.userDisplayName}>{currentUser.displayName}</h1>
      <p className={style.favoriteCount}>
        <FontAwesomeIcon className={style.faIcon} icon={faStar} /> {usersFavoriteCount}
      </p>
      <p className={style.userProfileBlurb}>{currentUser.blurb}</p>
      <Link className={style.editProfileButton} to="/edit-profile/">
        Edit Profile
      </Link>
    </div>
  )
}

export default CurrentUserInfo

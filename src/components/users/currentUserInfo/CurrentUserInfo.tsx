import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '@components/loading'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth, useUsers } from '@hooks/index'
import { UserType } from 'src/customTypes/types'

import style from './CurrentUserInfo.module.scss'

const CurrentUserInfo: React.FC = () => {
  const { user } = useAuth()
  const { getUsersFavoriteCount, setProfileListener } = useUsers()

  const [loading, setLoading] = useState<boolean>(true)
  const [usersFavoriteCount, setUsersFavoriteCount] = useState<number>(0)
  const [currentUser, setCurrentUser] = useState<UserType>({
    uid: '',
    displayName: '',
    photoURL: '',
    blurb: '',
    posts: 0,
    comments: 0
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
    <aside className={style.currentUserContainer}>
      <img className={style.userImg} src={currentUser.photoURL} referrerPolicy="no-referrer" />
      <h1 className={style.userDisplayName}>{currentUser.displayName}</h1>
      <p className={style.favoriteCount}>
        <FontAwesomeIcon className={style.faIcon} icon={faStar} /> {usersFavoriteCount}
      </p>
      <p className={style.userProfileBlurb}>{currentUser.blurb}</p>
      <Link className={style.editProfileButton} to="/edit-profile/">
        Edit Profile
      </Link>
    </aside>
  )
}

export default CurrentUserInfo

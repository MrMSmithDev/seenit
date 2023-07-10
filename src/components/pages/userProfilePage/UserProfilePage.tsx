import Loading from '@components/loading'
import UserProfileHeading from '@components/users/userProfileHeading'
import React, { useEffect, useState } from 'react'
import useUsers from '@hooks/useUsers'
import { Link, useParams } from 'react-router-dom'
import { UserType } from 'src/customTypes/types'

import style from './UserProfilePage.module.scss'

const UserProfilePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<UserType>({
    uid: '',
    displayName: '',
    photoURL: '',
    blurb: '',
    favorites: []
  })

  const { userID } = useParams()
  const { loadUserProfile } = useUsers()

  useEffect(() => {
    const loadUser = async (): Promise<void> => {
      const userData: UserType = await loadUserProfile(userID!)
      setUser(userData)
      if (userData) setIsLoading(false)
    }

    loadUser()
  }, [])

  if (isLoading) return <Loading />

  return (
    <div className={style.userProfilePageContainer}>
      <UserProfileHeading user={user} />
      <div className={style.userBlurb}>{user.blurb}</div>
      <Link className={style.editProfileButton} to="/edit-profile/">
        Edit Profile
      </Link>
    </div>
  )
}

export default UserProfilePage

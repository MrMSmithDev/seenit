import Loading from '@components/loading'
import UserProfileHeading from './userProfileHeading'
import React, { useEffect, useState } from 'react'
import useUsers from '@hooks/useUsers'
import { Link, useParams } from 'react-router-dom'
import { UserType } from 'src/customTypes/types'

import style from './UserProfilePage.module.scss'
import { useAuth } from '@hooks/index'

const UserProfilePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedUser, setSelectedUser] = useState<UserType>({
    uid: '',
    displayName: '',
    photoURL: '',
    blurb: '',
    favorites: []
  })

  const { user } = useAuth()
  const { userID } = useParams()
  const { loadUserProfile } = useUsers()

  useEffect(() => {
    const loadUser = async (): Promise<void> => {
      const userData: UserType = await loadUserProfile(userID!)
      setSelectedUser(userData)
      if (userData) setIsLoading(false)
    }

    loadUser()
  }, [])

  if (isLoading) return <Loading />

  const editProfile: React.ReactNode | null =
    user!.uid === selectedUser.uid ? (
      <Link className={style.profilePageButton} to="/edit-profile/">
        Edit Profile
      </Link>
    ) : null

  return (
    <div className={style.userProfilePageContainer}>
      <UserProfileHeading user={selectedUser} />
      <div className={style.userBlurb}>{selectedUser.blurb}</div>
      <div className={style.profileLinksContainer}>
        <Link
          className={style.profileLink}
          to={`/users/${selectedUser.uid}/posts`}
        >{`${selectedUser.displayName}'s Posts`}</Link>
        <Link
          className={style.profileLink}
          to={`/users/${selectedUser.uid}/favorites`}
        >{`${selectedUser.displayName}'s Favorites`}</Link>
        <Link
          className={style.profileLink}
          to={`/users/${selectedUser.uid}/comments`}
        >{`${selectedUser.displayName}'s Comments`}</Link>
      </div>
      {editProfile}
    </div>
  )
}

export default UserProfilePage

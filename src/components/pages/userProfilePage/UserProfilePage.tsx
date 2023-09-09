import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '@components/loading'
import { useAuth } from '@hooks/index'
import useUsers from '@hooks/useUsers'
import { UserType } from 'src/customTypes/types'

import UserProfileHeading from './userProfileHeading'
import UserStats from './userStats'

import style from './UserProfilePage.module.scss'

const UserProfilePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedUser, setSelectedUser] = useState<UserType>({
    uid: '',
    displayName: '',
    photoURL: '',
    blurb: '',
    favorites: [],
    posts: 0,
    comments: 0
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
  })

  if (isLoading) return <Loading />

  const editProfile: React.ReactNode | null =
    user!.uid === selectedUser.uid ? (
      <Link className={style.profilePageButton} to="/edit-profile/" data-testid="edit-profile-link">
        Edit Profile
      </Link>
    ) : null

  return (
    <div className={style.userProfilePageContainer}>
      <UserProfileHeading user={selectedUser} />
      <UserStats user={selectedUser} />
      <div className={style.userBlurb} data-testid="user-blurb">
        {selectedUser.blurb}
      </div>
      <div className={style.profileLinksContainer} data-testid="profile-links">
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

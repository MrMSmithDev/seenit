import React from 'react'
import { UserType } from 'src/customTypes/types'

import style from './UserProfileHeading.module.scss'

interface UserProfileHeadingProps {
  user: UserType
}

const UserProfileHeading: React.FC<UserProfileHeadingProps> = ({ user }) => {
  return (
    <div className={style.userProfileHeadingContainer}>
      <img
        className={style.profileHeadingImage}
        src={user.photoURL}
        alt="Users Profile Picture"
        referrerPolicy="no-referrer"
      />
      <h1 className={style.profileHeadingName}>{user.displayName}</h1>
    </div>
  )
}

export default UserProfileHeading

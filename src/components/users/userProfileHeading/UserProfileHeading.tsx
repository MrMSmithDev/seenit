import React from 'react'
import { UserType } from 'src/customTypes/types'

import style from './UserProfileHeading.module.scss'

interface UserProfileHeadingProps {
  user: UserType
}

const UserProfileHeading: React.FC<UserProfileHeadingProps> = ({ user }) => {
  return <div className={style.userProfileHeadingContainer}></div>
}

export default UserProfileHeading

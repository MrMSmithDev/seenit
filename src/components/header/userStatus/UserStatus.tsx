import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import style from './UserStatus.module.scss'

const UserStatus: React.FC = () => {
  return (
    <div className={`${style.userStatus} ${style.notLoggedIn}`}>
      <div className={style.userImgWrapper}>
        <FontAwesomeIcon className={style.userIcon} icon={faUser} />
      </div>
      <p>Login</p>
    </div>
  )
}

export default UserStatus

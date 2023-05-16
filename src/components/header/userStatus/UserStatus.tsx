import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import style from './UserStatus.module.scss'

const UserStatus: React.FC = () => {
  const [dropIsActive, setDropIsActive] = useState(false)
  const [authStatus, setAuthStatus] = useState(false)

  function signOut(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    setAuthStatus(!authStatus)
  }

  function showDropDown() {
    setDropIsActive(!dropIsActive)
  }

  return (
    <div className={`${style.userStatus} ${style.notLoggedIn}`} onClick={showDropDown}>
      <div className={style.userImgWrapper}>
        <FontAwesomeIcon className={style.userIcon} icon={faUser} />
      </div>
      <p>Login</p>
      <div className={`${style.dropDownMenu} ${dropIsActive ? style.isActive : ''}`}>
        <button className={style.signOutButton} onClick={signOut}>
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default UserStatus

import React, { useState } from 'react'
import useAuth from '@hooks/useAuth'

import style from './UserStatus.module.scss'

const UserStatus: React.FC = () => {
  const [dropIsActive, setDropIsActive] = useState(false)
  const { signOutUser, user } = useAuth()

  async function signOut(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    await signOutUser()
  }

  function showDropDown() {
    setDropIsActive(!dropIsActive)
  }

  return (
    <div className={style.userStatus} onClick={showDropDown} data-testid="user-status">
      <img className={style.userImg} src={user?.photoURL || undefined} alt="Users image" />
      <p>{user?.displayName}</p>
      <div className={`${style.dropDownMenu} ${dropIsActive ? style.isActive : ''}`}>
        <button className={style.signOutButton} onClick={signOut}>
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default UserStatus

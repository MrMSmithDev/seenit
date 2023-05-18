import React, { useState } from 'react'
import { useAuth } from '@hooks/useAuth'
import style from './UserStatus.module.scss'

const UserStatus: React.FC = () => {
  const [dropIsActive, setDropIsActive] = useState(false)
  const { signOutUser, getUserName, getUserImage } = useAuth()

  async function signOut(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    await signOutUser()
  }

  function showDropDown() {
    setDropIsActive(!dropIsActive)
  }

  return (
    <div className={`${style.userStatus} ${style.notLoggedIn}`} onClick={showDropDown}>
      <div className={style.userImgWrapper}>
        <div className={style.userImg} style={{ backgroundImage: getUserImage()! }} />
      </div>
      <p>{getUserName()}</p>
      <div className={`${style.dropDownMenu} ${dropIsActive ? style.isActive : ''}`}>
        <button className={style.signOutButton} onClick={signOut}>
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default UserStatus

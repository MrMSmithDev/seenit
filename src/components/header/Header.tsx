import React from 'react'
import { logo } from '@assets/images'
import UserStatus from './userStatus'

import style from './Header.module.scss'

const Header: React.FC = () => {
  //Create useState here which adjusts the size of the header when scrolled down.

  return (
    <div className={style.header}>
      <img className={style.headerLogo} src={logo} alt="SeenIt-logo-blue"></img>
      <UserStatus />
    </div>
  )
}

export default Header

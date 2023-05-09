import React from 'react'
import { logo } from '@assets/images'

import style from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <div className={style.header}>
      <img src={logo} alt="SeenIt-logo-blue"></img>
    </div>
  )
}

export default Header

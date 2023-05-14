import React, { ReactNode } from 'react'

import style from './Main.module.scss'

interface MainProps {
  children: Array<ReactNode>
}

const Main: React.FC<MainProps> = ({ children }) => {
  return <main className={style.main}>{children}</main>
}

export default Main

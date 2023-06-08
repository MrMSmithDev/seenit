import React from 'react'

import style from './Loading.module.scss'

const Loading: React.FC = () => {
  return (
    <div className={style.loadingContainer}>
      <div className={style.loadingIcon}>
        <div className={style.iconOuter}></div>
        <div className={style.iconInner}></div>
      </div>
    </div>
  )
}

export default Loading

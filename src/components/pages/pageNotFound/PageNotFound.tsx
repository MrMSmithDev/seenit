import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointLeft } from '@fortawesome/free-regular-svg-icons'
import React from 'react'
import { Link } from 'react-router-dom'

import style from './PageNotFound.module.scss'

const PageNotFound: React.FC = () => {
  return (
    <div className={style.pageNotFoundContainer}>
      <h1 className={style.pageNotFoundTitle}>404</h1>
      <p className={style.pageNotFoundPara}>Sorry, page not found</p>
      <Link className={style.homeButton} to="/">
        <FontAwesomeIcon className={style.faIcon} icon={faHandPointLeft} />
        Home
      </Link>
    </div>
  )
}

export default PageNotFound

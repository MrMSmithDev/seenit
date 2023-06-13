import React from 'react'
import { Link } from 'react-router-dom'
import { UserType } from 'src/customTypes/types'

import style from './AuthorInfo.module.scss'

interface AuthorInfoProps {
  author: UserType
  bold?: boolean
  link?: boolean
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ author, bold, link }) => {
  if (link)
    return (
      <Link className={style.authorContainer} to={`/users/profile/${author.uid}`}>
        <img className={style.postAuthorImg} src={author.photoURL} alt="User's image" />
        <p className={`${style.postAuthor} ${bold ? style.bold : null}`}>{author.displayName}</p>
      </Link>
    )
  else
    return (
      <div className={style.authorContainer}>
        <img
          className={style.postAuthorImg}
          src={author.photoURL}
          alt="User's image"
          referrerPolicy="no-referrer"
        />
        <p className={`${style.postAuthor} ${bold ? style.bold : null}`}>{author.displayName}</p>
      </div>
    )
}

export default AuthorInfo

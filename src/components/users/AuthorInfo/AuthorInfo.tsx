import React from 'react'
import { Link } from 'react-router-dom'
import { UserType } from 'src/customTypes/types'

import style from './AuthorInfo.module.scss'

interface AuthorInfoProps {
  author: UserType
  bold?: boolean
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ author, bold }) => {
  return (
    <Link to={`/users/${author.uid}`}>
      <div className={style.authorContainer}>
        <img className={style.postAuthorImg} src={author.photoURL} alt="User's image" />
        <p className={`${style.postAuthor} ${bold ? style.bold : null}`}>{author.displayName}</p>
      </div>
    </Link>
  )
}

export default AuthorInfo

import React from 'react'
import { Link } from 'react-router-dom'
import { UserType } from 'src/customTypes/types'

import style from './AuthorInfo.module.scss'

interface AuthorInfoProps {
  author: UserType
  preview?: boolean
  bold?: boolean
  link?: boolean
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ author, bold, link, preview }) => {
  let imgElement: React.ReactNode | null = null
  if (author.photoURL.length > 0) {
    imgElement = (
      <img
        className={style.postAuthorImg}
        src={author.photoURL}
        alt="User's image"
        referrerPolicy="no-referrer"
      />
    )
  }

  if (link)
    return (
      <Link className={style.authorContainer} to={`/users/profile/${author.uid}`}>
        {imgElement}
        <p
          className={`${style.postAuthor} ${bold ? style.bold : null}`}
          data-testid="author-info-link"
        >
          {author.displayName}
        </p>
      </Link>
    )
  else
    return (
      <div className={style.authorContainer}>
        {imgElement}
        <p
          className={`${style.postAuthor} ${bold ? style.bold : null} ${
            preview ? style.preview : null
          }`}
        >
          {author.displayName}
        </p>
      </div>
    )
}

export default AuthorInfo

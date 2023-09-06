import React from 'react'
import { faStar as hollowStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './PostHeadline.module.scss'

interface PostHeadlineProps {
  title: string
  toggleFavorite: (event: React.MouseEvent<HTMLButtonElement>) => void
  userHasFavorite: boolean
  preview?: boolean
}

const PostHeadline: React.FC<PostHeadlineProps> = ({
  title,
  toggleFavorite,
  userHasFavorite,
  preview = false
}) => {
  return (
    <p
      className={preview ? `${style.headline} ${style.preview}` : style.headline}
      data-testid="post-title"
    >
      <span>
        <button className={style.favoriteButton} onClick={toggleFavorite}>
          <FontAwesomeIcon
            className={style.starIcon}
            icon={userHasFavorite ? solidStar : hollowStar}
          />
        </button>
      </span>
      <span className={style.postTitle}>{title}</span>
    </p>
  )
}

export default PostHeadline

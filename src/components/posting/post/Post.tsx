import React, { useState } from 'react'

import style from './Post.module.scss'
import { PostType } from 'src/customTypes/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as hollowStar, faMessage } from '@fortawesome/free-regular-svg-icons'

interface PostProps {
  currentPost: PostType
  isPreview: boolean
}

const Post: React.FC<PostProps> = ({ currentPost, isPreview }) => {
  const [userHasFavorite, setUserHasFavorite] = useState(false)
  const postStyle = isPreview ? `${style.post} ${style.postPreview}` : style.postBody

  function toggleFavorite(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    setUserHasFavorite(!userHasFavorite)
  }

  return (
    <div className={postStyle} data-post-id={currentPost.ID}>
      <p className={style.headline}>
        <button className={style.favoriteButton} onClick={toggleFavorite}>
          <FontAwesomeIcon
            className={style.starIcon}
            icon={userHasFavorite ? solidStar : hollowStar}
          />
        </button>
        <span className={style.postTitle}>{currentPost.title}</span>
      </p>
      <p className={style.postBody}>{currentPost.body}</p>
      <div className={style.postInfo}>
        <p className={style.postTimestamp}>{currentPost.timeStamp}</p>
        <p className={style.postCommentCount}>
          {currentPost.comments?.length || 0} <FontAwesomeIcon icon={faMessage} />
        </p>
        <p className={style.postFavoriteCount}>
          0 <FontAwesomeIcon className={style.starIcon} icon={solidStar} />
        </p>
        <p className={style.postAuthor}>{currentPost.author}</p>
      </div>
    </div>
  )
}

export default Post

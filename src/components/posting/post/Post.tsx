import React from 'react'

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
  const userHasFavorite = false
  const postStyle = isPreview ? `${style.post} ${style.postPreview}` : style.postBody

  return (
    <div className={postStyle}>
      <p className={style.headline}>
        <FontAwesomeIcon
          className={style.starIcon}
          icon={userHasFavorite ? solidStar : hollowStar}
        />
        <span className={style.postTitle}>{currentPost.title}</span>
      </p>
      <p className={style.postBody}>{currentPost.body}</p>
      <div className={style.postInfo}>
        <p className={style.postTimestamp}>{currentPost.timeStamp}</p>
        <p className={style.postCommentCount}>
          {currentPost.comments?.length || 0} <FontAwesomeIcon icon={faMessage} />
        </p>
        <p className={style.postAuthor}>{currentPost.author}</p>
      </div>
    </div>
  )
}

export default Post

import React from 'react'

import style from './Post.module.scss'
import { PostType } from 'src/customTypes/types'

interface PostProps {
  currentPost: PostType
  isPreview: boolean
}

const Post: React.FC<PostProps> = ({ currentPost, isPreview }) => {
  const postStyle = isPreview ? `${style.post} ${style.postPreview}` : style.postBody

  return (
    <div className={postStyle}>
      <p className={style.postTitle}>{currentPost.title}</p>
      <p className={style.postBody}>{currentPost.body}</p>
      <div className={style.postInfo}>
        <p className={style.postTimestamp}>{currentPost.timeStamp}</p>
        <p className={style.postAuthor}>{currentPost.author}</p>
      </div>
    </div>
  )
}

export default Post

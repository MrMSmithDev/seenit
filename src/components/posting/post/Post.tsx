import React from 'react'

import style from './Post.module.scss'
import { PostType } from 'src/customTypes/types'

interface PostProps {
  currentPost: PostType
  isPreview: boolean
}

const Post: React.FC<PostProps> = ({ currentPost, isPreview }) => {
  return (
    <div className={style.post}>
      <p className={style.postTitle}>{currentPost.title}</p>
      <p className={style.postBody}></p>
    </div>
  )
}

export default Post

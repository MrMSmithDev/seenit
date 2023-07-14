import React from 'react'
import { Link } from 'react-router-dom'

import style from './PostControls.module.scss'

interface PostControlsProps {
  postID: string
}

const PostControls: React.FC<PostControlsProps> = ({ postID }) => {
  return (
    <div className={style.postControlsContainer}>
      <Link className={style.postControl} to={`/posts/${postID}/edit`}>
        Edit
      </Link>
      <button className={style.postControl}>Delete</button>
    </div>
  )
}

export default PostControls

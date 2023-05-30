import React from 'react'
import { CommentType } from 'src/customTypes/types'

import style from './Comment.module.scss'

interface CommentProps {
  comment: CommentType
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className={style.comment}>
      <p>{comment.body}</p>
    </div>
  )
}

export default Comment

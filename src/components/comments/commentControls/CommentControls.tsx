import React from 'react'

import style from './CommentControls.module.scss'

interface CommentControlsProps {
  commentID: string
}

const CommentControls: React.FC<CommentControlsProps> = ({ commentID }) => {
  const editOnClick = (): void => {
    console.log('Edit comment:', commentID)
  }

  const deleteOnClick = (): void => {
    console.log('Delete comment:', commentID)
  }

  return (
    <div className={style.commentControlsContainer}>
      <button className={style.commentControl} onClick={editOnClick}>
        Edit
      </button>
      <button className={style.commentControl} onClick={deleteOnClick}>
        Delete
      </button>
    </div>
  )
}

export default CommentControls

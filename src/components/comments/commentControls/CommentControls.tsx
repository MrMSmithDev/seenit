import React from 'react'

import style from './CommentControls.module.scss'

interface CommentControlsProps {
  commentID: string
  editState: boolean
  setEditState: (change: boolean) => void
}

const CommentControls: React.FC<CommentControlsProps> = ({
  commentID,
  editState,
  setEditState
}) => {
  const editOnClick = (): void => {
    setEditState(!editState)
  }

  const deleteOnClick = (): void => {
    console.log('Delete comment:', commentID)
  }

  return (
    <div className={style.commentControlsContainer}>
      <button className={style.commentControl} onClick={editOnClick}>
        {editState ? 'Cancel' : 'Edit'}
      </button>
      <button className={style.commentControl} onClick={deleteOnClick}>
        Delete
      </button>
    </div>
  )
}

export default CommentControls

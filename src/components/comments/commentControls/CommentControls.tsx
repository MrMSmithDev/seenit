import React from 'react'
import ConfirmModal from '@components/modal/confirmModal/ConfirmModal'
import { useComments } from '@hooks/index'
import useConfirm from '@hooks/useConfirm/useConfirm'

import style from './CommentControls.module.scss'

interface CommentControlsProps {
  commentID: string
  editState: boolean
  setEditState: (change: boolean) => void
  setRemoved: (change: boolean) => void
}

const CommentControls: React.FC<CommentControlsProps> = ({
  commentID,
  editState,
  setEditState,
  setRemoved
}) => {
  const confirm = useConfirm()
  const { deleteComment } = useComments()

  const editOnClick = (): void => {
    setEditState(!editState)
  }

  const deleteOnClick = (): void => {
    confirm.toggle('Are you sure you want to delete this comment? This action cannot be undone')
  }

  return (
    <div className={style.commentControlsContainer}>
      <button className={style.commentControl} onClick={editOnClick}>
        {editState ? 'Cancel' : 'Edit'}
      </button>
      <button className={style.commentControl} onClick={deleteOnClick}>
        Delete
      </button>
      <ConfirmModal
        message={confirm.message}
        isShowing={confirm.isShowing}
        toggle={confirm.toggle}
        callbackFunction={async (): Promise<void> => {
          const result = await deleteComment(commentID)
          if (result.success) setRemoved(true)
        }}
      />
    </div>
  )
}

export default CommentControls

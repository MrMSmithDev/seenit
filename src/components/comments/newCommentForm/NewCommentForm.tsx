import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from '@components/modal/messageModal'
import { useComments, useNotification } from '@hooks/index'

import style from './NewCommentForm.module.scss'

const NewCommentForm: React.FC = () => {
  const { postID } = useParams()
  const [commentBody, setCommentBody] = useState<string>('')
  const { writeComment } = useComments()

  const notify = useNotification()

  const uploadComment = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault()
    if (commentBody.match(/[a-z|0-9]/gi)) {
      const resultBool: boolean = await writeComment(postID!, commentBody)
      if (resultBool) {
        setCommentBody('')
        notify.toggle('Comment Published')
      } else {
        notify.toggle('Error publishing comment')
      }
    }
  }

  const handleCommentBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setCommentBody(e.target.value)
  }

  return (
    <div className={style.newCommentContainer}>
      <form className={style.newCommentForm} data-testid="new-comment-form">
        <label htmlFor="comment-input">Add Comment</label>
        <textarea
          id="comment-input"
          name="comment-input"
          minLength={3}
          maxLength={400}
          value={commentBody}
          onChange={handleCommentBodyChange}
          data-testid="new-comment-input"
        />
        <button
          className={style.confirmButton}
          type="submit"
          onClick={uploadComment}
          disabled={commentBody.length <= 0}
          data-testid="new-comment-publish-btn"
        >
          Publish
        </button>
      </form>
      <Modal isShowing={notify.isShowing} toggle={notify.toggle} message={notify.message} />
    </div>
  )
}

export default NewCommentForm

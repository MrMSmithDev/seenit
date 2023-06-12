import React, { useEffect, useState } from 'react'

import useComments from '@hooks/useComments'

import style from './NewCommentForm.module.scss'
import { useParams } from 'react-router-dom'

const NewCommentForm: React.FC = () => {
  const { postID } = useParams()
  const [commentBody, setCommentBody] = useState<string>('')
  const [commentSuccess, setCommentSuccess] = useState<boolean>(false)
  const { writeComment } = useComments()

  useEffect((): void => {
    let timeoutID
    if (commentSuccess)
      timeoutID = setTimeout(() => {
        setCommentSuccess(false)
      }, 3000)

    return clearTimeout(timeoutID)
  }, [commentSuccess])

  const uploadComment = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault()
    if (commentBody.match(/[a-z|0-9]/gi)) {
      const resultBool = await writeComment(postID!, commentBody)
      if (resultBool) {
        setCommentBody('')
        setCommentSuccess(true)
      }
    }
  }

  const handleCommentBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setCommentBody(e.target.value)
  }

  const successMessage: React.ReactNode = (
    <div>
      <p>Comment added</p>
    </div>
  )

  return (
    <div className={style.newCommentContainer}>
      <form className={style.newCommentForm}>
        <label htmlFor="comment-input">Add Comment</label>
        <textarea
          id="comment-input"
          name="comment-input"
          minLength={3}
          maxLength={400}
          value={commentBody}
          onChange={handleCommentBodyChange}
        />
        <button className={style.confirmButton} type="submit" onClick={uploadComment}>
          Confirm
        </button>
      </form>
      {commentSuccess ? successMessage : null}
    </div>
  )
}

export default NewCommentForm

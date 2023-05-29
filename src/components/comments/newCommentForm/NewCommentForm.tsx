import React, { useState } from 'react'

import style from './NewCommentForm.module.scss'

const NewCommentForm: React.FC = () => {
  const [commentBody, setCommentBody] = useState('')

  const uploadComment = () => {
    console.log(commentBody)
  }

  const handleCommentBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentBody(e.target.value)
  }

  return (
    <div className={style.newCommentContainer}>
      <form className={style.newCommentForm}>
        <label>Comment</label>
        <textarea onChange={handleCommentBodyChange} />
        <button type="submit" onClick={uploadComment}>
          Confirm
        </button>
      </form>
    </div>
  )
}

export default NewCommentForm

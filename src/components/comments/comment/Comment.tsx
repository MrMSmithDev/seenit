import React, { useEffect, useState } from 'react'
import Modal from '@components/modal/messageModal'
import AuthorInfo from '@components/users/authorInfo'
import { useAuth, useComments, useNotification, useUsers } from '@hooks/index'
import formatTime from '@utils/formatTime'
import emptyUser from '@utils/placeholders/emptyUser'
import { CommentType, UserType } from 'src/customTypes/types'

import CommentControls from '../commentControls'

import VoteContainer from './voteContainer'

import style from './Comment.module.scss'

interface CommentProps {
  comment: CommentType
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [author, setAuthor] = useState<UserType>(emptyUser)
  const [editing, setEditing] = useState<boolean>(false)
  const [commentBody, setCommentBody] = useState<string>(comment.body)
  const [editBody, setEditBody] = useState<string>(comment.body)

  const { user } = useAuth()
  const { editComment } = useComments()
  const notify = useNotification()
  const { loadUserProfile } = useUsers()

  const timePosted: Date = comment.timeStamp.toDate()
  const formattedTime: string = formatTime(timePosted)

  useEffect((): void => {
    const loadAuthor = async (): Promise<void> => {
      const userProfile = await loadUserProfile(comment.authorID)
      setAuthor(userProfile)
    }

    loadAuthor()
  }, [])

  const handleEditBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditBody(e.target.value)
  }

  const writeFunctionEdit = async (): Promise<void> => {
    const resultBool = await editComment(comment.ID, editBody)
    if (resultBool) {
      setCommentBody(editBody)
      setEditing(false)
      notify.toggle('Comment edited')
    } else {
      notify.toggle('Unable to edit comment, please try again later')
    }
  }

  let commentControlsElement: React.ReactNode | null
  if (user) {
    commentControlsElement =
      user.uid === author.uid ? (
        <CommentControls commentID={comment.ID} editState={editing} setEditState={setEditing} />
      ) : null
  }

  let commentState: React.ReactNode

  if (editing)
    commentState = (
      <div className={style.editContainer}>
        <textarea
          className={style.editCommentInput}
          onChange={handleEditBodyChange}
          value={editBody}
        />
        <button className={style.submitCommentEdit} onClick={writeFunctionEdit}>
          Publish edit
        </button>
      </div>
    )
  else
    commentState = (
      <React.Fragment>
        <p className={style.commentBody}>{commentBody}</p>
        {comment.edited ? <p className={style.edited}>* This comment has been edited *</p> : null}
      </React.Fragment>
    )

  return (
    <div className={style.commentContainer} data-comment-post-id={comment.postID}>
      <VoteContainer comment={comment} />
      <div className={style.comment}>
        <div className={style.commentTimestamp}>{formattedTime}</div>
        {commentState}
        <div className={style.commentInfo}>
          {commentControlsElement}
          <AuthorInfo author={author} link={true} />
        </div>
      </div>
      <Modal isShowing={notify.isShowing} toggle={notify.toggle} message={notify.message} />
    </div>
  )
}

export default Comment

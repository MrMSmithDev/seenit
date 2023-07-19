import React, { useEffect, useState } from 'react'
import { CommentType, UserType } from 'src/customTypes/types'
import VoteContainer from './voteContainer'
import { useAuth, useUsers } from '@hooks/index'

import formatTime from '@utils/formatTime'

import style from './Comment.module.scss'
import AuthorInfo from '@components/users/authorInfo'
import emptyUser from '@utils/placeholders/emptyUser'
import CommentControls from '../commentControls'

interface CommentProps {
  comment: CommentType
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [author, setAuthor] = useState<UserType>(emptyUser)
  const [editing, setEditing] = useState<boolean>(false)
  const { user } = useAuth()
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
        <textarea className={style.editCommentInput} value={comment.body} />
        <button className={style.submitCommentEdit}>Publish edit</button>
      </div>
    )
  else commentState = <p className={style.commentBody}>{comment.body}</p>

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
    </div>
  )
}

export default Comment

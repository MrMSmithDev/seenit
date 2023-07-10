import React, { useEffect, useState } from 'react'
import { CommentType, UserType } from 'src/customTypes/types'
import VoteContainer from './voteContainer'
import useUsers from '@hooks/useUsers'

import formatTime from '@utils/formatTime'

import style from './Comment.module.scss'
import AuthorInfo from '@components/users/authorInfo'

interface CommentProps {
  comment: CommentType
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [author, setAuthor] = useState<UserType>({
    uid: '',
    displayName: '',
    photoURL: '',
    blurb: ''
  })
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

  return (
    <div className={style.commentContainer} data-comment-post-id={comment.postID}>
      <VoteContainer comment={comment} />
      <div className={style.comment}>
        <div className={style.commentTimestamp}>{formattedTime}</div>
        <p className={style.commentBody}>{comment.body}</p>
        <div className={style.commentInfo}>
          <AuthorInfo author={author} link={true} />
        </div>
      </div>
    </div>
  )
}

export default Comment

import React, { useEffect, useState } from 'react'
import { CommentType, UserType } from 'src/customTypes/types'
import VoteContainer from './voteContainer'
import useUsers from '@hooks/useUsers'

import months from '@utils/months'

import style from './Comment.module.scss'
import AuthorInfo from '@components/users/AuthorInfo'

interface CommentProps {
  comment: CommentType
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [author, setAuthor] = useState<UserType>({ uid: '', displayName: '', photoURL: '' })
  const { loadUserProfile } = useUsers()
  const timePosted: Date = comment.timeStamp.toDate()

  useEffect((): void => {
    const loadAuthor = async (): Promise<void> => {
      const userProfile = await loadUserProfile(comment.authorID)
      setAuthor(userProfile)
    }

    loadAuthor()
  }, [])

  return (
    <div className={style.commentContainer} data-comment-post-id={comment.postID}>
      <VoteContainer />
      <div className={style.comment}>
        <div className={style.commentTimestamp}>
          {[
            `${timePosted.getHours()}:${timePosted.getMinutes()} `,
            `${timePosted.getDate()} ${months[timePosted.getMonth()]} ${timePosted.getFullYear()}`
          ]}
        </div>
        <p className={style.commentBody}>{comment.body}</p>
        <div className={style.commentInfo}>
          <AuthorInfo author={author} />
        </div>
      </div>
    </div>
  )
}

export default Comment

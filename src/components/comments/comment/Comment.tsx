import React, { useEffect, useState } from 'react'
import { CommentType, UserType } from 'src/customTypes/types'
import VoteContainer from './voteContainer'
import useUsers from '@hooks/useUsers'

import months from '@utils/months'

import style from './Comment.module.scss'

interface CommentProps {
  comment: CommentType
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [author, setAuthor] = useState<UserType>({ uid: '', displayName: '', photoURL: '' })
  const { loadUserProfile } = useUsers()
  const timePosted = comment.timeStamp.toDate()

  useEffect(() => {
    const loadAuthor = async () => {
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
          <div className={style.authorContainer}>
            <img className={style.postAuthorImg} src={author.photoURL} alt="User's image" />
            <p className={style.postAuthor}>{author.displayName}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment

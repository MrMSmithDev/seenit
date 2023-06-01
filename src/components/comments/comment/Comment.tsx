import React, { useEffect, useState } from 'react'
import { CommentType, UserType } from 'src/customTypes/types'
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
    <div className={style.comment}>
      <p>{comment.body}</p>
      <div className={style.commentInfo}>
        <p className={style.commentTimestamp}>
          {[
            `${timePosted.getHours()}:${timePosted.getMinutes()} `,
            `${months[timePosted.getMonth()]} ${timePosted.getFullYear()}`
          ]}
        </p>
        <div className={style.authorContainer}>
          <img className={style.postAuthorImg} src={author.photoURL} alt="User's image" />
          <p className={style.postAuthor}>{author.displayName}</p>
        </div>
      </div>
    </div>
  )
}

export default Comment

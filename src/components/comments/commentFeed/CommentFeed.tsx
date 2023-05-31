import React, { useEffect, useState } from 'react'
import { CommentType } from 'src/customTypes/types'
import useComments from '@hooks/useComments'

import style from './CommentFeed.module.scss'
// import { useParams } from 'react-router-dom'
import Comment from '../comment'

interface CommentFeedProps {
  commentIDs: string[] | undefined
}

const CommentFeed: React.FC<CommentFeedProps> = ({ commentIDs }) => {
  const [currentComments, setCurrentComments] = useState<CommentType[]>([])
  // const { postID } = useParams()
  const { loadCommentFeed } = useComments()

  useEffect(() => {
    if (commentIDs) {
      const commentFeed = loadCommentFeed(commentIDs)
      setCurrentComments(commentFeed)
    }
  }, [])

  const commentArr = currentComments.map((comment: CommentType) => {
    return <Comment comment={comment} key={comment.ID} />
  })

  return <div className={style.commentFeed}>{commentArr}</div>
}

export default CommentFeed

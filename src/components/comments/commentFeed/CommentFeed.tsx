import React, { useEffect, useState } from 'react'
import { CommentType } from 'src/customTypes/types'
import useComments from '@hooks/useComments'

import style from './CommentFeed.module.scss'
import { useParams } from 'react-router-dom'
import Comment from '../comment'

const CommentFeed: React.FC = () => {
  const [currentComments, setCurrentComments] = useState<CommentType[]>([])
  const { postID } = useParams()
  const { loadCommentFeed } = useComments()

  useEffect(() => {
    const loadComments = async () => {
      const commentFeed = await loadCommentFeed(postID!)
      setCurrentComments(commentFeed)
    }

    loadComments()
  }, [])

  const commentArr = currentComments.map((comment: CommentType) => {
    return <Comment comment={comment} key={comment.ID} />
  })

  return <div className={style.commentFeed}>{commentArr}</div>
}

export default CommentFeed

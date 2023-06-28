import React, { ReactNode, useEffect, useState } from 'react'
import { CommentType } from 'src/customTypes/types'
import useComments from '@hooks/useComments'

import style from './CommentFeed.module.scss'
import Comment from '../comment'

interface CommentFeedProps {
  commentIDs: string[] | undefined
}

const CommentFeed: React.FC<CommentFeedProps> = ({ commentIDs }) => {
  const [currentComments, setCurrentComments] = useState<ReactNode[]>([])
  const { loadCommentFeed } = useComments()

  useEffect((): void => {
    if (commentIDs) {
      const loadComments = async () => {
        const commentFeed: CommentType[] = await loadCommentFeed(commentIDs)
        const commentArr: ReactNode[] = commentFeed.map((comment: CommentType) => (
          <Comment comment={comment} key={comment.ID} />
        ))

        setCurrentComments(commentArr)
      }

      loadComments()
    }
  }, [])

  return <div className={style.commentFeed}>{currentComments}</div>
}

export default CommentFeed

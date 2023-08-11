import React, { ReactNode, useEffect, useState } from 'react'
import { CommentType } from 'src/customTypes/types'
// import useComments from '@hooks/useComments'

import style from './CommentFeed.module.scss'
import Comment from '../comment'
import useInfiniteScrollComments from '@hooks/useInfiniteScrollComments/useInfiniteScrollComments'
import Loading from '@components/loading'

interface CommentFeedProps {
  commentIDs: string[] | undefined
  postID: string
}

const CommentFeed: React.FC<CommentFeedProps> = ({ postID }) => {
  // const [currentComments, setCurrentComments] = useState<ReactNode[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { comments, loadCommentScroll } = useInfiniteScrollComments()

  useEffect(() => {
    const loadComments = async (): Promise<void> => {
      await loadCommentScroll(postID)
      setIsLoading(false)
    }

    loadComments()
  }, [])

  useEffect(() => {
    const handleScroll = async (): Promise<void> => {
      const isNearingBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 250
      if (isNearingBottom) {
        await loadCommentScroll(postID)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  })

  const currentComments: ReactNode[] = comments.map((comment: CommentType) => {
    return <Comment comment={comment} key={comment.ID} />
  })

  if (isLoading) return <Loading />
  return <div className={style.commentFeed}>{currentComments}</div>
}

export default CommentFeed

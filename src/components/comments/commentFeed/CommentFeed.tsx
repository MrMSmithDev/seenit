import React, { ReactNode, useEffect, useState } from 'react'
import Loading from '@components/loading'
import FeedMessage from '@components/modal/feedMessage'
import useInfiniteScrollComments from '@hooks/useInfiniteScrollComments/useInfiniteScrollComments'
import { CommentType } from 'src/customTypes/types'

import Comment from '../comment'

import style from './CommentFeed.module.scss'

interface CommentFeedProps {
  commentIDs: string[] | undefined
  postID: string
}

const CommentFeed: React.FC<CommentFeedProps> = ({ postID }) => {
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
  return (
    <div className={style.commentFeed}>
      {currentComments.length > 0 ? (
        currentComments
      ) : (
        <FeedMessage message="Oh no! No one has commented yet. Be the first?" />
      )}
    </div>
  )
}

export default CommentFeed

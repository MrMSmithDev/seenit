import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '@components/loading'
import FeedMessage from '@components/modal/feedMessage/FeedMessage'
import PostPreview from '@components/posting/postPreview'
import { usePosts, useUsers } from '@hooks/index'
import useInfiniteScrollComments from '@hooks/useInfiniteScrollComments/useInfiniteScrollComments'
import { CommentType } from 'src/customTypes/types'

import Comment from '../comment'

import FurtherComments from './furtherComments'

import style from './UserCommentFeed.module.scss'

interface PostIDsWithComments {
  postID: string
  commentArr: CommentType[]
}

const checkPostID = (arr: PostIDsWithComments[], id: string): boolean => {
  const found = arr?.some((post) => post.postID === id)
  return found
}

const UserCommentFeed: React.FC = () => {
  const { userID } = useParams()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userDisplayName, setUserDisplayName] = useState<string>('')
  const [feedData, setFeedDataState] = useState<ReactNode[]>([])

  const feedDataRef = useRef<ReactNode[]>(feedData)
  const setFeedData = (newData: ReactNode[]): void => {
    feedDataRef.current = newData
    setFeedDataState(newData)
  }

  const { getUsersDisplayName } = useUsers()
  const { loadCurrentPost } = usePosts()

  const { comments, loadCommentScroll } = useInfiniteScrollComments()

  useEffect(() => {
    const getUsersName = async (): Promise<void> => {
      const displayName = await getUsersDisplayName(userID!)
      setUserDisplayName(displayName)
    }

    getUsersName()
  }, [])

  useEffect(() => {
    const setComments = async (): Promise<void> => {
      await loadCommentScroll(null, userID)
    }

    setComments()
  }, [userID])

  useEffect(() => {
    const setPostsForComments = async (): Promise<void> => {
      const postArr: PostIDsWithComments[] = []

      // Set array of comment IDs from author for each post
      comments.forEach((currentComment: CommentType) => {
        const postID = currentComment.postID
        if (checkPostID(postArr, postID)) {
          const arrIndex = postArr.findIndex((post) => post.postID === currentComment.postID)
          postArr[arrIndex].commentArr.push(currentComment)
        } else {
          postArr[postArr.length] = { postID, commentArr: [currentComment] }
        }
      })

      // Sort comments by date for each post:
      postArr.forEach((post) => {
        post.commentArr.sort((a, b) => (a.timeStamp.toDate() < b.timeStamp.toDate() ? -1 : 1))
      })

      // Create Array of nodes
      const feedArr = await Promise.all(
        postArr.map(async (postWithCommentsObj) => {
          const { postID, commentArr } = postWithCommentsObj
          const currentPost = await loadCurrentPost(postID)
          return (
            <div className={style.postWithComments} key={postID}>
              <PostPreview currentPost={currentPost} />
              <Comment comment={commentArr[0]} />
              {commentArr.length > 1 ? <FurtherComments commentArr={commentArr.slice(1)} /> : null}
            </div>
          )
        })
      )

      setFeedData(feedArr)
      setIsLoading(false)
    }

    setPostsForComments()
  }, [comments])

  useEffect(() => {
    const handleScroll = async (): Promise<void> => {
      const isNearingBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 250
      if (isNearingBottom) {
        await loadCommentScroll(null, userID)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [userID])

  if (isLoading) return <Loading />

  return (
    <div className={style.userCommentFeed}>
      <p className={style.feedTitle} data-testid="feed-title">{`${userDisplayName}'s Comments`}</p>
      <div className={style.feedContainer}>
        {feedDataRef.current.length > 0 ? (
          feedDataRef.current
        ) : (
          <FeedMessage message="It looks like this user has not made any comments yet" />
        )}
      </div>
    </div>
  )
}

export default UserCommentFeed

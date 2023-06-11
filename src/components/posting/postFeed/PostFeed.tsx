/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { ReactNode, useEffect, useState } from 'react'
import PostPreview from '@components/posting/postPreview'

import style from './PostFeed.module.scss'
import { PostType } from 'src/customTypes/types'
import { usePosts, useUsers } from '@hooks/index'
import PostFilterBar from '@components/posting/postFilterBar'
import { useParams } from 'react-router-dom'
import Loading from '@components/loading'

interface PostFeedProps {
  feedTitle: string
  constraint?: string
}

const PostFeed: React.FC<PostFeedProps> = ({ feedTitle, constraint }) => {
  const { userID } = useParams()
  const [title, setTitle] = useState<string>(feedTitle)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { loadPostFeed, loadUserFavorites, filter } = usePosts()
  const { getUsersDisplayName } = useUsers()
  const [currentPosts, setCurrentPosts] = useState<PostType[]>([])

  useEffect(() => {
    const createTitle = async () => {
      const tempTitle = `${await getUsersDisplayName(userID!)}'s ${feedTitle}`
      setTitle(tempTitle)
    }

    if (userID) createTitle()
    else setTitle(feedTitle)
  }, [userID])

  useEffect(() => {
    const fetchPosts = async () => {
      let posts
      if (userID && constraint === 'favorites') posts = await loadUserFavorites(userID)
      else posts = await loadPostFeed()
      setCurrentPosts(posts)
      if (posts) setIsLoading(false)
    }

    fetchPosts()
  }, [filter, feedTitle])

  const postArr: ReactNode[] = currentPosts.map((post: PostType) => {
    return <PostPreview currentPost={post} key={post.ID} />
  })

  if (isLoading) return <Loading />

  return (
    <div className={style.postFeedContainer}>
      <PostFilterBar feedTitle={title} />
      <div className={style.postFeed}>{postArr}</div>
    </div>
  )
}

export default PostFeed

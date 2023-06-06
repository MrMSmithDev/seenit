/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { ReactNode, useEffect, useState } from 'react'
import PostPreview from '@components/posting/postPreview'

import style from './PostFeed.module.scss'
import { PostType } from 'src/customTypes/types'
import { usePosts, useUsers } from '@hooks/index'
import PostFilterBar from '@components/posting/postFilterBar'
import { useParams } from 'react-router-dom'

interface PostFeedProps {
  feedTitle: string
}

const PostFeed: React.FC<PostFeedProps> = ({ feedTitle }) => {
  const { userID } = useParams()
  const [title, setTitle] = useState<string>(feedTitle)

  const { loadPostFeed, filter } = usePosts()
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
      if (!userID) posts = await loadPostFeed()
      else posts = await loadPostFeed()
      setCurrentPosts(posts)
    }

    fetchPosts()
  }, [filter])

  const postArr: ReactNode[] = currentPosts.map((post: PostType) => {
    return <PostPreview currentPost={post} key={post.ID} />
  })

  return (
    <div className={style.postFeedContainer}>
      <PostFilterBar feedTitle={title} />
      <div className={style.postFeed}>{postArr}</div>
    </div>
  )
}

export default PostFeed

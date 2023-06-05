/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { ReactNode, useEffect, useState } from 'react'
import PostPreview from '@components/posting/postPreview'

import style from './PostFeed.module.scss'
import { PostType } from 'src/customTypes/types'
import usePosts from '@hooks/usePosts'
import PostFilterBar from '@components/posting/postFilterBar'

const PostFeed: React.FC = () => {
  const { loadPostFeed, filter } = usePosts()
  const [currentPosts, setCurrentPosts] = useState<PostType[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await loadPostFeed()
      setCurrentPosts(posts)
    }

    fetchPosts()
  }, [filter])

  const postArr: ReactNode[] = currentPosts.map((post: PostType) => {
    return <PostPreview currentPost={post} key={post.ID} />
  })

  return (
    <div className={style.postFeedContainer}>
      <PostFilterBar feedTitle="Home" />
      <div className={style.postFeed}>{postArr}</div>
    </div>
  )
}

export default PostFeed

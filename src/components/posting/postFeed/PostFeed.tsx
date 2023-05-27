/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { ReactNode, useEffect, useState } from 'react'
import PostPreview from '@components/posting/postPreview'

import style from './PostFeed.module.scss'
import { PostType } from 'src/customTypes/types'
import useFirestore from '@hooks/useFirestore'

const PostFeed: React.FC = () => {
  const { loadPostFeed } = useFirestore()
  const [currentPosts, setCurrentPosts] = useState<PostType[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await loadPostFeed()
      setCurrentPosts(posts)
    }

    fetchPosts()
  }, [])

  const postArr: ReactNode[] = currentPosts.map((post: PostType) => {
    return <PostPreview currentPost={post} key={post.ID} />
  })

  return <div className={style.postFeed}>{postArr}</div>
}

export default PostFeed

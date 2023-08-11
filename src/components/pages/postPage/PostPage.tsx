import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentFeed from '@components/comments/commentFeed'
import NewCommentForm from '@components/comments/newCommentForm'
import Loading from '@components/loading'
import Post from '@components/posting/post'
import { usePosts } from '@hooks/index'
import { PostType } from 'src/customTypes/types'

import style from './PostPage.module.scss'

const PostPage: React.FC = () => {
  const [currentPost, setCurrentPost] = useState<PostType | null>()
  const [loading, setLoading] = useState<boolean>(true)

  const { loadCurrentPost } = usePosts()
  const { postID } = useParams()

  useEffect(() => {
    const loadPost = async (): Promise<void> => {
      const retrievedPost: PostType = await loadCurrentPost(postID!)
      setCurrentPost(retrievedPost)
      setLoading(false)
    }

    loadPost()
  }, [postID])

  if (loading) return <Loading />

  if (currentPost)
    return (
      <div className={style.postPage}>
        <Post currentPost={currentPost} />
        <NewCommentForm />
        <CommentFeed commentIDs={currentPost.comments} postID={postID!} />
      </div>
    )
  else return <Loading />
}

export default PostPage

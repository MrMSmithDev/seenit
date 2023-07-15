import React, { useEffect, useState } from 'react'
import Post from '@components/posting/post'

import style from './PostPage.module.scss'
import NewCommentForm from '@components/comments/newCommentForm'
import CommentFeed from '@components/comments/commentFeed'
import { PostType } from 'src/customTypes/types'
import { useParams } from 'react-router-dom'
import { usePosts } from '@hooks/index'
import Loading from '@components/loading'

const PostPage: React.FC = () => {
  const [currentPost, setCurrentPost] = useState<PostType | null>()

  const { loadCurrentPost } = usePosts()
  const { postID } = useParams()

  useEffect(() => {
    const loadPost = async (): Promise<void> => {
      let retrievedPost: PostType | null = null
      while (!retrievedPost) {
        try {
          retrievedPost = await loadCurrentPost(postID!)
        } catch (error) {
          console.log(error)
        }
      }
      // retrievedPost = (await loadCurrentPost(postID!)) || null
      // console.log(retrievedPost)
      setCurrentPost(retrievedPost)
    }

    loadPost()
  }, [])

  if (currentPost)
    return (
      <div className={style.postPage}>
        <Post currentPost={currentPost} />
        <NewCommentForm />
        <CommentFeed commentIDs={currentPost.comments} />
      </div>
    )
  else return <Loading />
}

export default PostPage

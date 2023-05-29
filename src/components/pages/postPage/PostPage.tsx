import React from 'react'
import Post from '@components/posting/post'

import style from './PostPage.module.scss'
import NewCommentForm from '@components/comments/newCommentForm'
import CommentFeed from '@components/comments/commentFeed'

const PostPage: React.FC = () => {
  return (
    <div className={style.postPage}>
      <Post />
      <NewCommentForm />
      <CommentFeed />
    </div>
  )
}

export default PostPage

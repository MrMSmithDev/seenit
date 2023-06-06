import React from 'react'
import { Route, Routes } from 'react-router-dom'

// import Post from '@components/posting/post'
import NewPostForm from '@components/posting/newPostForm'
import PostFeed from '@components/posting/postFeed'
import PostPage from '@components/pages/postPage'
import UserCommentFeed from '@components/comments/userCommentFeed'

const PostRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PostFeed feedTitle="Home" />} />
      <Route path="/posts/new" element={<NewPostForm />} />
      <Route path="/posts/:postID/:postTitle" element={<PostPage />} />
      <Route path="/users/:userID/posts" element={<PostFeed feedTitle={'Posts'} />} />
      <Route path="/users/:userID/comments" element={<UserCommentFeed />} />
    </Routes>
  )
}

export default PostRoutes

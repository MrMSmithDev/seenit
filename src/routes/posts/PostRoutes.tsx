import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Post from '@components/posting/post'
import NewPostForm from '@components/posting/newPostForm'
import PostFeed from '@components/posting/postFeed'

const PostRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PostFeed />} />
      <Route path="/posts/new" element={<NewPostForm />} />
      <Route
        path="/posts/:postID"
        element={<Post currentPost={{ ID: '', authorID: '', body: '', title: '' }} />}
      />
    </Routes>
  )
}

export default PostRoutes

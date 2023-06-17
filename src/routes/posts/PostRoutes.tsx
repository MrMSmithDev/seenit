import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import NewPostForm from '@components/posting/newPostForm'
import PostFeed from '@components/posting/postFeed'
import PostPage from '@components/pages/postPage'
import UserCommentFeed from '@components/comments/userCommentFeed'
import UserProfilePage from '@components/pages/userProfilePage'
import PageNotFound from '@components/pages/pageNotFound'

const PostRoutes: React.FC = () => {
  const location = useLocation()
  return (
    <Routes>
      <Route key={location.pathname} path="/" element={<PostFeed feedTitle="Home" />} />
      <Route key={`${location.pathname}-new-post`} path="/posts/new" element={<NewPostForm />} />
      <Route
        key={`${location.pathname}-post`}
        path="/posts/:postID/:postTitle"
        element={<PostPage />}
      />
      <Route
        key={`${location.pathname}-user-posts`}
        path="/users/:userID/posts"
        element={<PostFeed feedTitle="Posts" />}
      />
      <Route
        key={`${location.pathname}-user-comments`}
        path="/users/:userID/comments"
        element={<UserCommentFeed />}
      />
      <Route
        key={`${location.pathname}-user-favorites`}
        path="/users/:userID/favorites"
        element={<PostFeed feedTitle="Favorites" constraint="favorites" />}
      />
      <Route
        key={`${location.pathname}-user-profile`}
        path="/users/profile/:userID"
        element={<UserProfilePage />}
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default PostRoutes

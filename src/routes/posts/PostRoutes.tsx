import React, { useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import UserCommentFeed from '@components/comments/userCommentFeed'
import EditProfilePage from '@components/pages/editProfilePage'
import PageNotFound from '@components/pages/pageNotFound'
import PostPage from '@components/pages/postPage'
import UserProfilePage from '@components/pages/userProfilePage'
import PostFeed from '@components/posting/postFeed'
import PostForm from '@components/posting/postForm'

const PostRoutes: React.FC = () => {
  const location = useLocation()
  useLayoutEffect(() => {
    // Scroll to top on change of current path name
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Routes>
      <Route key={location.pathname} path="/" element={<PostFeed feedTitle="Home" />} />
      <Route key={`${location.pathname}-new-post`} path="/posts/new" element={<PostForm />} />
      <Route
        key={`${location.pathname}-edit-post`}
        path="/posts/:postID/edit"
        element={<PostForm toEdit={true} />}
      />
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
      <Route
        key={`${location.pathname}-edit-profile`}
        path="/edit-profile"
        element={<EditProfilePage />}
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default PostRoutes

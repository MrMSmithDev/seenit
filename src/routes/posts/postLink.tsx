import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface PostLinkProps {
  postID: string
  postTitle: string
  children: ReactNode
}

const PostLink: React.FC<PostLinkProps> = ({ postID, postTitle, children }) => {
  return (
    <Link to={`/posts/${postID}/${postTitle}`} data-testid="postLink">
      {children}
    </Link>
  )
}

export default PostLink

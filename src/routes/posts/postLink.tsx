import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface PostLinkProps {
  postID: string
  children: ReactNode
}

const PostLink: React.FC<PostLinkProps> = ({ postID, children }) => {
  return (
    <Link to={`/posts/${postID}`} data-postID={postID} data-testid="postLink">
      {children}
    </Link>
  )
}

export default PostLink

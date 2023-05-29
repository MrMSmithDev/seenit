import React from 'react'
import Post from '@components/posting/post'

import style from './PostPage.module.scss'

const PostPage: React.FC = () => {
  return (
    <div className={style.postPage}>
      <Post />
      <div>Comment space</div>
    </div>
  )
}

export default PostPage

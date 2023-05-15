import React from 'react'
import Post from '@components/posting/post'

import style from './PostFeed.module.scss'

const PostFeed: React.FC = () => {
  return (
    <div className={style.postFeed}>
      <Post
        currentPost={{
          id: 'postIDbaby',
          dateTime: '12:45 12/05/22',
          author: 'michael',
          title: 'Post title',
          body: 'Post body'
        }}
        isPreview={true}
      />
    </div>
  )
}

export default PostFeed

// id: string
// dateTime: string
// author: string
// title: string
// body: string

// New Post
// My Posts
// My Comments

// Favourites
//

import React from 'react'

import style from './UserBar.module.scss'

const UserBar: React.FC = () => {
  return (
    <div className={style.userBar}>
      <button>New Post</button>
      <button>My Posts</button>
      <button>My Comments</button>
      <button>Favorites</button>
      <button>Settings</button>
    </div>
  )
}

export default UserBar

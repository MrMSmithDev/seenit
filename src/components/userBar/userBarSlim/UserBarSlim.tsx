import React from 'react'
import { Link } from 'react-router-dom'
import { User } from 'firebase/auth'

import style from '../UserBar.module.scss'
import localStyle from './UserBarSlim.module.scss'

interface UserBarSlimProps {
  user: User
}

const UserBarSlim: React.FC<UserBarSlimProps> = ({ user }) => {
  return (
    <div className={`${localStyle.carouselOuter}`}>
      <div className={localStyle.userBarSlim}>
        <Link
          to="/"
          className={`${style.sidebarLink} ${localStyle.carouselItem}`}
          tabIndex={1}
          data-testid="sidebarLink"
        >
          Home
        </Link>
        <Link
          to="/posts/new"
          className={`${style.sidebarLink} ${localStyle.carouselItem}`}
          tabIndex={2}
          data-testid="sidebarLink"
        >
          New Post
        </Link>
        <Link
          to={`/users/${user?.uid}/posts`}
          className={`${style.sidebarLink} ${localStyle.carouselItem}`}
          tabIndex={3}
          data-testid="sidebarLink"
        >
          My Posts
        </Link>
        <Link
          to={`/users/${user?.uid}/comments`}
          className={`${style.sidebarLink} ${localStyle.carouselItem}`}
          tabIndex={4}
          data-testid="sidebarLink"
        >
          My Comments
        </Link>
        <Link
          to={`/users/${user?.uid}/favorites`}
          className={`${style.sidebarLink} ${localStyle.carouselItem}`}
          tabIndex={5}
          data-testid="sidebarLink"
        >
          My Favorites
        </Link>
        <Link
          to={`/users/profile/${user?.uid}`}
          className={`${style.sidebarLink} ${localStyle.carouselItem}`}
          tabIndex={6}
          data-testid="sidebarLink"
        >
          My Profile
        </Link>
      </div>
    </div>
  )
}

export default UserBarSlim

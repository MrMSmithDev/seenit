import { User } from 'firebase/auth'
import React from 'react'
import { Link } from 'react-router-dom'

import style from '../UserBar.module.scss'
import localStyle from './UserBarWide.module.scss'

interface UserBarWideProps {
  user: User
}

const UserBarWide: React.FC<UserBarWideProps> = ({ user }) => {
  return (
    <div className={localStyle.userBarLarge}>
      <Link to="/" className={style.sidebarLink} tabIndex={1} data-testid="sidebarLink">
        Home
      </Link>
      <Link to="/posts/new" className={style.sidebarLink} tabIndex={2} data-testid="sidebarLink">
        New Post
      </Link>
      <Link
        to={`/users/${user?.uid}/posts`}
        className={style.sidebarLink}
        tabIndex={3}
        data-testid="sidebarLink"
      >
        My Posts
      </Link>
      <Link
        to={`/users/${user?.uid}/comments`}
        className={style.sidebarLink}
        tabIndex={4}
        data-testid="sidebarLink"
      >
        My Comments
      </Link>
      <Link
        to={`/users/${user?.uid}/favorites`}
        className={style.sidebarLink}
        tabIndex={5}
        data-testid="sidebarLink"
      >
        My Favorites
      </Link>
      <Link
        to={`/users/profile/${user?.uid}`}
        className={style.sidebarLink}
        tabIndex={6}
        data-testid="sidebarLink"
      >
        My Profile
      </Link>
      <Link to={'/settings'} className={style.sidebarLink} tabIndex={7} data-testid="sidebarLink">
        Settings
      </Link>
    </div>
  )
}

export default UserBarWide

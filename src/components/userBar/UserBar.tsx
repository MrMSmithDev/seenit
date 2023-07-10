import React from 'react'
import useAuth from '@hooks/useAuth'

import UserBarWide from '@components/userBar/userBarWide'

const UserBar: React.FC = () => {
  const { user } = useAuth()

  return (
    <UserBarWide user={user!} />
    // <div className={style.userBarLarge}>
    //   <Link to="/" className={style.sidebarLink} tabIndex={1} data-testid="sidebarLink">
    //     Home
    //   </Link>
    //   <Link to="/posts/new" className={style.sidebarLink} tabIndex={2} data-testid="sidebarLink">
    //     New Post
    //   </Link>
    //   <Link
    //     to={`/users/${user?.uid}/posts`}
    //     className={style.sidebarLink}
    //     tabIndex={3}
    //     data-testid="sidebarLink"
    //   >
    //     My Posts
    //   </Link>
    //   <Link
    //     to={`/users/${user?.uid}/comments`}
    //     className={style.sidebarLink}
    //     tabIndex={4}
    //     data-testid="sidebarLink"
    //   >
    //     My Comments
    //   </Link>
    //   <Link
    //     to={`/users/${user?.uid}/favorites`}
    //     className={style.sidebarLink}
    //     tabIndex={5}
    //     data-testid="sidebarLink"
    //   >
    //     My Favorites
    //   </Link>
    //   <Link
    //     to={`/users/profile/${user?.uid}`}
    //     className={style.sidebarLink}
    //     tabIndex={6}
    //     data-testid="sidebarLink"
    //   >
    //     My Profile
    //   </Link>
    //   <Link to={'/settings'} className={style.sidebarLink} tabIndex={7} data-testid="sidebarLink">
    //     Settings
    //   </Link>
    // </div>
  )
}

export default UserBar

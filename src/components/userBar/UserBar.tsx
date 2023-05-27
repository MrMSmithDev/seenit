import React from 'react'
import { Link } from 'react-router-dom'

import style from './UserBar.module.scss'

const UserBar: React.FC = () => {
  return (
    <div className={style.userBar}>
      <Link to="/" className={style.sidebarLink} tabIndex={1} data-testid="sidebarLink">
        Home
      </Link>
      <Link to="/posts/new" className={style.sidebarLink} tabIndex={2} data-testid="sidebarLink">
        New Post
      </Link>
      <Link to="/" className={style.sidebarLink} tabIndex={3} data-testid="sidebarLink">
        My Posts
      </Link>
      <Link to="/" className={style.sidebarLink} tabIndex={4} data-testid="sidebarLink">
        My Comments
      </Link>
      <Link to="/" className={style.sidebarLink} tabIndex={5} data-testid="sidebarLink">
        My Favorites
      </Link>
      <Link to="/" className={style.sidebarLink} tabIndex={6} data-testid="sidebarLink">
        Settings
      </Link>
    </div>
  )
}

export default UserBar

// to={`/products/${product.id}`}
// className={style.productCard}
// data-product-id={product.id}
// tabIndex="-1"
// data-testid="product-card"

import React from 'react'

import style from './PostFilterItem.module.scss'

interface PostFilterItemProps {
  filterText: string
  filterID: string
  handleFilterClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const PostFilterItem: React.FC<PostFilterItemProps> = ({ filterText, handleFilterClick }) => {
  return (
    <button className={style.dropItem} onClick={handleFilterClick}>
      {filterText}
    </button>
  )
}

export default PostFilterItem

import React from 'react'

import style from './PostFilterItem.module.scss'
import { usePosts } from '@hooks/index'

interface PostFilterItemProps {
  filterText: string
  filterID: string
}

const PostFilterItem: React.FC<PostFilterItemProps> = ({ filterText, filterID }) => {
  const { setFilter } = usePosts()
  const handleItemClick = (): void => {
    setFilter(filterID)
  }

  return (
    <button className={style.dropItem} onClick={handleItemClick}>
      {filterText}
    </button>
  )
}

export default PostFilterItem

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { usePosts } from '@hooks/index'
import React, { ReactNode, useState } from 'react'

import filters from '@utils/filters.js'

import style from './PostFilterBar.module.scss'
import PostFilterItem from './postFilterItem/PostFilterItem'

interface PostFilterBarProps {
  feedTitle?: string
}

const PostFilterBar: React.FC<PostFilterBarProps> = ({ feedTitle }) => {
  const [dropIsActive, setDropIsActive] = useState<boolean>(false)
  const { filter } = usePosts()

  const handleDropToggle = (): void => {
    setDropIsActive(!dropIsActive)
  }

  const dropItems: ReactNode[] = filters.map((filterItem) => {
    return (
      <PostFilterItem filterText={filterItem.text} filterID={filterItem.id} key={filterItem.id} />
    )
  })

  return (
    <div className={style.filterBar}>
      <p className={style.postFeedTitle}>{feedTitle}</p>
      <p className={style.filterTitle}>Filter</p>
      <div className={style.dropMenu}>
        <button className={style.dropToggle} onClick={handleDropToggle}>
          {filter}{' '}
          <FontAwesomeIcon
            icon={faCaretDown}
            className={`${style.faIcon} ${dropIsActive ? style.dropIsActive : ''}`}
          />
        </button>
        <div className={`${style.dropContent} ${dropIsActive ? style.dropIsActive : ''}`}>
          {dropItems}
        </div>
      </div>
    </div>
  )
}

export default PostFilterBar

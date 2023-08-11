import React, { ReactNode, useState } from 'react'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { filters } from '@utils/filters'

import PostFilterItem from './postFilterItem'

import style from './PostFilterBar.module.scss'

interface PostFilterBarProps {
  feedTitle?: string
  filterSetting: string
  handleFilterChange: (newFilterSetting: string) => void
}

const PostFilterBar: React.FC<PostFilterBarProps> = ({
  handleFilterChange,
  feedTitle,
  filterSetting
}) => {
  const [dropIsActive, setDropIsActive] = useState<boolean>(false)

  const handleDropToggle = (): void => {
    setDropIsActive(!dropIsActive)
  }

  const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonElement = e.target as HTMLButtonElement
    const newFilterSetting: string = buttonElement.textContent || ''
    handleFilterChange(newFilterSetting)
    handleDropToggle()
  }

  const dropItems: ReactNode[] = filters.map((filterItem) => {
    return (
      <PostFilterItem
        filterText={filterItem.text}
        filterID={filterItem.id}
        handleFilterClick={handleFilterClick}
        key={filterItem.id}
      />
    )
  })

  return (
    <div className={style.filterBar}>
      <p className={style.postFeedTitle}>{feedTitle}</p>
      <p className={style.filterTitle}>Filter</p>
      <div className={style.dropMenu}>
        <button className={style.dropToggle} onClick={handleDropToggle}>
          {filterSetting}{' '}
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

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { CommentType } from 'src/customTypes/types'
import Comment from '@components/comments/comment'

import style from './FurtherComments.module.scss'

interface FurtherCommentsProps {
  commentArr: CommentType[]
  displayName?: string
}

const FurtherComments: React.FC<FurtherCommentsProps> = ({ commentArr, displayName }) => {
  const [dropIsActive, setDropIsActive] = useState<boolean>(false)
  const comments = commentArr.map((comment) => <Comment comment={comment} key={comment.ID} />)

  const handleDropToggle = () => {
    setDropIsActive(!dropIsActive)
  }

  return (
    <div className={style.dropMenu}>
      <p className={style.dropToggle} onClick={handleDropToggle}>
        Show more comments by {displayName || 'this user'}
        <FontAwesomeIcon
          className={`${style.faIcon} ${dropIsActive ? style.isActive : ''}`}
          icon={faCaretDown}
        />
      </p>
      <div className={`${style.dropContent} ${dropIsActive ? style.isActive : ''}`}>{comments}</div>
    </div>
  )
}

export default FurtherComments

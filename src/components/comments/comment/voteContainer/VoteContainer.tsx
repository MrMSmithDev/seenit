import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpLong, faDownLong } from '@fortawesome/free-solid-svg-icons'

import style from './VoteContainer.module.scss'

const VoteContainer: React.FC = () => {
  const [commentUserPoint, setCommentUserPoint] = useState<number>(0)

  const incrementCommentPoint = () => {
    if (commentUserPoint != 1) setCommentUserPoint(1)
    else setCommentUserPoint(0)
  }

  const decrementCommentPoint = () => {
    if (commentUserPoint != -1) setCommentUserPoint((prev) => prev - 1)
    else setCommentUserPoint(0)
  }

  return (
    <div className={style.voteContainer}>
      <button
        className={style.iconButton}
        onClick={incrementCommentPoint}
        style={commentUserPoint === 1 ? { color: 'blue' } : {}}
      >
        <FontAwesomeIcon icon={faUpLong} />
      </button>
      <div className={style.faIcon}>{commentUserPoint}</div>
      <button
        className={style.iconButton}
        onClick={decrementCommentPoint}
        style={commentUserPoint === -1 ? { color: 'red' } : {}}
      >
        <FontAwesomeIcon icon={faDownLong} />
      </button>
    </div>
  )
}

export default VoteContainer

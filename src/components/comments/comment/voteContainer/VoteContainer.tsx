import React, { useEffect, useState } from 'react'
import { faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth, useComments } from '@hooks/index'
import { CommentType } from 'src/customTypes/types'

import style from './VoteContainer.module.scss'

interface VoteContainerProps {
  comment: CommentType
}

const VoteContainer: React.FC<VoteContainerProps> = ({ comment }) => {
  const { user } = useAuth()
  const { incrementCommentScore, updateUserInteractions } = useComments()

  const [commentScore, setCommentScore] = useState<number>(comment.score)
  const [commentUserPoints, setCommentUserPoints] = useState<number>(0)

  useEffect(() => {
    if (user && comment?.userInteractions.length > 0) {
      comment?.userInteractions?.forEach((interaction) => {
        const [key, value] = Object.entries(interaction)[0]
        if (key === user.uid) setCommentUserPoints(value)
      })
    }
  }, [user])

  const incrementStatePoints = (change: number): void => {
    setCommentScore((prev) => prev + change)
    setCommentUserPoints((prev) => prev + change)
  }

  const incrementCommentPoint = (): void => {
    if (commentUserPoints != 1) {
      incrementStatePoints(1)
      updateUserInteractions(comment.ID, user!.uid, 1)
      incrementCommentScore(comment.ID, 1)
    } else {
      incrementStatePoints(-1)
      updateUserInteractions(comment.ID, user!.uid, 0)
      incrementCommentScore(comment.ID, -1)
    }
  }

  const decrementCommentPoint = (): void => {
    if (commentUserPoints != -1) {
      incrementStatePoints(-1)
      updateUserInteractions(comment.ID, user!.uid, -1)
      incrementCommentScore(comment.ID, -1)
    } else {
      incrementStatePoints(1)
      updateUserInteractions(comment.ID, user!.uid, 0)
      incrementCommentScore(comment.ID, 1)
    }
  }

  return (
    <div className={style.voteContainer}>
      <button
        className={style.iconButton}
        onClick={incrementCommentPoint}
        style={commentUserPoints === 1 ? { color: 'blue' } : {}}
      >
        <FontAwesomeIcon icon={faUpLong} />
      </button>
      <div className={style.faIcon}>{commentScore}</div>
      <button
        className={style.iconButton}
        onClick={decrementCommentPoint}
        style={commentUserPoints === -1 ? { color: 'red' } : {}}
      >
        <FontAwesomeIcon icon={faDownLong} />
      </button>
    </div>
  )
}

export default VoteContainer

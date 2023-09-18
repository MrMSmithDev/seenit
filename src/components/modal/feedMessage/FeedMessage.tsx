import React from 'react'
import { faSadTear } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './FeedMessage.module.scss'

interface FeedMessageProps {
  message: string
}

const FeedMessage: React.FC<FeedMessageProps> = ({ message }) => {
  return (
    <div className={style.messageContainer}>
      <p className={style.message}>{message}</p>
      <FontAwesomeIcon icon={faSadTear} className={style.messageContainerIcon} />
    </div>
  )
}

export default FeedMessage

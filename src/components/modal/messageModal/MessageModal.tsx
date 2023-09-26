/* eslint-disable prettier/prettier */
// Disabled due to conflicting errors with spacing within createPortal
import React from 'react'
import { createPortal } from 'react-dom'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './MessageModal.module.scss'

interface MessageModalProps {
  message: string
  isShowing: boolean
  toggle: () => void
}

const MessageModal: React.FC<MessageModalProps> = ({ message, isShowing, toggle }) => {
  return isShowing
    ? createPortal(
      <div className={style.modalOverlay}>
        <div className={style.modalContainer}>
          <p>{message}</p>
          <button className={style.closeModal} onClick={toggle} aria-label="Close modal"><FontAwesomeIcon icon={faCircleXmark} aria-hidden="true"/></button>
        </div>
      </div>,
      document.body
    )
    : null
}

export default MessageModal

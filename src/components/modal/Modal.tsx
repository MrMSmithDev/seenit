/* eslint-disable prettier/prettier */
// Disabled due to conflicting errors with spacing within createPortal
import React from 'react'
import { createPortal } from 'react-dom'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './Modal.module.scss'

interface ModalProps {
  message: string
  isShowing: boolean
  toggle: () => void
}

const Modal: React.FC<ModalProps> = ({ message, isShowing, toggle }) => {
  return isShowing
    ? createPortal(
      <div className={style.modalOverlay}>
        <div className={style.modalContainer}>
          <p>{message}</p>
          <button className={style.closeModal} onClick={toggle}><FontAwesomeIcon icon={faCircleXmark}/></button>
        </div>
      </div>,
      document.body
    )
    : null
}

export default Modal

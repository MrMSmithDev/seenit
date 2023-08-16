import React from 'react'
import { createPortal } from 'react-dom'

import style from './ConfirmModal.module.scss'

interface ConfirmModalProps {
  message: string
  isShowing: boolean
  toggle: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, isShowing, toggle }) => {
  return isShowing
    ? createPortal(
      <div className={style.modalOverlay}>
        <div className={style.modalContainer}>
          <p>{message}</p>
          <div>
          <button className={style.modalButton} onClick={confirm}>Confirm</button>
          <button className={style.modalButton} onClick={cancel}>Cancel</button>
          </div>
        </div>
      </div>,
      document.body
    )
    : null
}

export default ConfirmModal
/* eslint-disable prettier/prettier */
// Disabled due to conflicting errors with spacing within createPortal

import React from 'react'
import { createPortal } from 'react-dom'

import style from './ConfirmModal.module.scss'

interface ConfirmModalProps {
  message: string
  isShowing: boolean
  toggle: () => void
  callbackFunction: (() => Promise<void>) | null
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, isShowing, toggle, callbackFunction }) => {

  const confirm = () => {
    if (callbackFunction) callbackFunction()
    toggle()
  }

  return isShowing
    ? createPortal(
      <div className={style.modalOverlay}>
        <div className={style.modalContainer}>
          <p>{message}</p>
          <div className={style.buttonsContainer}>
            <button className={style.modalButton} onClick={confirm}>
                Confirm
            </button>
            <button className={style.modalButton} onClick={toggle}>
                Cancel
            </button>
          </div>
        </div>
      </div>,
      document.body
    )
    : null
}

export default ConfirmModal

import React from 'react'

import style from './EditInfo.module.scss'

interface EditInfoProps {
  setTempDisplayName: (arg0: string) => void
  setTempProfileText: (arg0: string) => void
}

const EditInfo: React.FC<EditInfoProps> = ({ setTempDisplayName, setTempProfileText }) => {
  return (
    <div className={style.editInfoContainer}>
      <form className={style.infoForm}>
        <div className={style.editInfoInputContainer}>
          <label>label</label>
          <input />
        </div>
        <div className={style.editInfoInputContainer}>
          <label>Label</label>
          <textarea />
        </div>
      </form>
    </div>
  )
}

export default EditInfo

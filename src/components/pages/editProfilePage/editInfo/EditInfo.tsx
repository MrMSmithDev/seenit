import React from 'react'
import { UserType } from 'src/customTypes/types'

import style from './EditInfo.module.scss'

interface EditInfoProps {
  currentUser: UserType
  setTempDisplayName: (arg0: string) => void
  setTempProfileText: (arg0: string) => void
}

const EditInfo: React.FC<EditInfoProps> = ({
  currentUser,
  setTempDisplayName,
  setTempProfileText
}) => {
  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempDisplayName(e.target.value)
  }

  const handleProfileTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTempProfileText(e.target.value)
  }

  return (
    <div className={style.editInfoContainer}>
      <form className={style.infoForm}>
        <div className={style.editInfoInputContainer}>
          <label>Display Name:</label>
          <input
            type="text"
            defaultValue={currentUser.displayName}
            onChange={handleDisplayNameChange}
          />
        </div>
        <div className={style.editInfoInputContainer}>
          <label>Profile Blurb</label>
          <textarea defaultValue={currentUser.blurb} onChange={handleProfileTextChange} />
        </div>
      </form>
    </div>
  )
}

export default EditInfo

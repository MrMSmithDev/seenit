import React, { useState } from 'react'

import style from './EditPicture.module.scss'

interface EditPictureProps {
  currentPicture: string
  setTempPicture: (arg0: string | File) => void
}

const EditPicture: React.FC<EditPictureProps> = ({ currentPicture, setTempPicture }) => {
  const [imagePreview, setImagePreview] = useState<string>(currentPicture)

  const handleImageInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const imageFile = e.target.files[0]
      setTempPicture(imageFile)
      const preview = URL.createObjectURL(imageFile)
      setImagePreview(preview)
    }
  }

  return (
    <div className={style.editPictureContainer}>
      <img className={style.picturePreview} src={imagePreview} referrerPolicy="no-referrer" />
      <input
        className={style.pictureInput}
        type="file"
        onChange={handleImageInput}
        name="profileImage"
        accept="image/*"
      />
    </div>
  )
}

export default EditPicture

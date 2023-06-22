import React, { useEffect, useState } from 'react'
import useAuth from '@hooks/useAuth'

import style from './EditPicture.module.scss'

interface EditPictureProps {
  setTempImage: (arg0: string | File) => void
}

const EditPicture: React.FC<EditPictureProps> = ({ setTempImage }) => {
  const [imagePreview, setImagePreview] = useState<string>('')

  const { getUserImage, user } = useAuth()

  useEffect(() => {
    if (user) {
      const userImage = getUserImage()
      if (userImage) setImagePreview(userImage)
    }
  }, [user])

  const handleImageInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const imageFile = e.target.files[0]
      setTempImage(imageFile)
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

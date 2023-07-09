import React, { useEffect, useState } from 'react'

import style from './EditPicture.module.scss'
import { useAuth, useUsers } from '@hooks/index'

interface EditPictureProps {
  setTempImage: (arg0: null | File) => void
}

const EditPicture: React.FC<EditPictureProps> = ({ setTempImage }) => {
  const [imagePreview, setImagePreview] = useState<string>('')

  const { user } = useAuth()
  const { loadProfileImage } = useUsers()

  useEffect(() => {
    if (user) {
      const loadImage = async (): Promise<void> => {
        const userImage = await loadProfileImage(user.uid)
        setImagePreview(userImage)
      }

      loadImage()
    }
  }, [user])

  const handleImageInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0]
      const preview = URL.createObjectURL(imageFile)
      setTempImage(imageFile)
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

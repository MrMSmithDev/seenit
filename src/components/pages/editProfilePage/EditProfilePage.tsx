import Loading from '@components/loading'
import { useAuth, useUsers } from '@hooks/index'
import React, { useEffect, useState } from 'react'
import { UserType } from 'src/customTypes/types'
import EditInfo from './editInfo'
import EditPicture from './editPicture'

import style from './EditProfilePage.module.scss'

const EditProfilePage: React.FC = () => {
  const { user } = useAuth()
  const { loadUserProfile } = useUsers()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentUser, setCurrentUser] = useState<UserType>({
    uid: '',
    displayName: '',
    photoURL: '',
    favorites: [],
    blurb: ''
  })

  const [tempProfileImage, setTempProfileImage] = useState<string | File>(currentUser.photoURL)
  const [tempDisplayName, setTempDisplayName] = useState<string>(currentUser.displayName)
  const [tempProfileText, setTempProfileText] = useState<string>(currentUser.blurb)

  useEffect(() => {
    if (user) {
      const loadProfile = async (): Promise<void> => {
        const userProfile: UserType = await loadUserProfile(user.uid)
        setCurrentUser(userProfile)
        setTempProfileImage(userProfile.photoURL)
        setTempDisplayName(userProfile.displayName)
      }

      loadProfile()
      setIsLoading(false)
    }
  }, [user])

  const handleSaveInfo = () => {
    console.log(tempDisplayName)
    console.log(tempProfileText)
  }

  if (isLoading) return <Loading />

  return (
    <div className={style.editProfileContainer}>
      <h1 className={style.editPostTitle}>Edit Profile</h1>
      <EditPicture setTempImage={setTempProfileImage} />
      <EditInfo
        currentUser={currentUser}
        setTempDisplayName={setTempDisplayName}
        setTempProfileText={setTempProfileText}
      />
      <button className={style.saveButton} onClick={handleSaveInfo}>
        Save Changes
      </button>
    </div>
  )
}

export default EditProfilePage

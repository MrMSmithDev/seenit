import Loading from '@components/loading'
import { useAuth, useUsers } from '@hooks/index'
import React, { useEffect, useState } from 'react'
import { UserType } from 'src/customTypes/types'
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
    favorites: []
  })

  const [currentTempProfilePicture, setTempProfilePicture] = useState<string | File>(
    currentUser.photoURL
  )
  const [currentTempDisplayName, setTempDisplayName] = useState<string>(currentUser.displayName)

  useEffect(() => {
    if (user) {
      const loadProfile = async (): Promise<void> => {
        const userProfile: UserType = await loadUserProfile(user.uid)
        setCurrentUser(userProfile)
        setTempProfilePicture(userProfile.photoURL)
        setTempDisplayName(userProfile.displayName)
      }

      loadProfile()
      setIsLoading(false)
    }
  }, [user])

  if (isLoading) return <Loading />

  return (
    <div className={style.editProfileContainer}>
      <EditPicture currentPicture={currentUser.photoURL} setTempPicture={setTempProfilePicture} />
    </div>
  )
}

export default EditProfilePage

import Loading from '@components/loading'
import { useAuth, useUsers } from '@hooks/index'
import React, { useEffect, useState } from 'react'
import { UserType } from 'src/customTypes/types'

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

  useEffect(() => {
    if (user) {
      const loadProfile = async (): Promise<void> => {
        const userProfile: UserType = await loadUserProfile(user.uid)
        setCurrentUser(userProfile)
      }

      loadProfile()
      setIsLoading(false)
    }
    console.log(currentUser)
  }, [user])

  if (isLoading) return <Loading />

  return (
    <div className={style.editProfileContainer}>
      {/* <div className={style.editPictureContainer}>
        <img src={currentUser.photoURL}/>
    </div>
    < */}
    </div>
  )
}

export default EditProfilePage

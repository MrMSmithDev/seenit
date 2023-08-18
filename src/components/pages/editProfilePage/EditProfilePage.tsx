import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '@components/loading'
import Modal from '@components/modal/messageModal'
import { useAuth, useNotification, useUsers } from '@hooks/index'
import { ApiReturn, UserType } from 'src/customTypes/types'

import EditInfo from './editInfo'
import EditPicture from './editPicture'

import style from './EditProfilePage.module.scss'

const EditProfilePage: React.FC = () => {
  const { user } = useAuth()
  const { updateUserProfile, loadUserProfile } = useUsers()
  const navigate = useNavigate()
  const notify = useNotification()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentUser, setCurrentUser] = useState<UserType>({
    uid: '',
    displayName: '',
    photoURL: '',
    favorites: [],
    blurb: '',
    posts: 0,
    comments: 0
  })

  const [tempProfileImage, setTempProfileImage] = useState<null | File>()
  const [tempDisplayName, setTempDisplayName] = useState<string>(currentUser.displayName)
  const [tempProfileText, setTempProfileText] = useState<string>(currentUser.blurb)

  useEffect(() => {
    if (user) {
      const loadProfile = async (): Promise<void> => {
        const userProfile: UserType = await loadUserProfile(user.uid)
        setCurrentUser(userProfile)
        setTempDisplayName(userProfile.displayName)
        setTempProfileText(userProfile.blurb)
      }

      loadProfile()
      setIsLoading(false)
    }
  }, [user])

  const handleSaveInfo = async () => {
    const newUserInfo: UserType = {
      uid: user!.uid,
      displayName: tempDisplayName,
      blurb: tempProfileText,
      photoURL: currentUser.photoURL,
      image: tempProfileImage,
      posts: currentUser.posts,
      comments: currentUser.comments
    }
    const result: ApiReturn = await updateUserProfile(user!.uid, newUserInfo)
    if (result.success) {
      navigate(`/users/profile/${user!.uid}`)
      notify.toggle('Profile updated')
    } else {
      notify.toggle('Error updating profile')
    }
  }

  if (isLoading) return <Loading />

  return (
    <div className={style.editProfileContainer}>
      <h1 className={style.editProfileTitle}>Edit Profile</h1>
      <EditPicture setTempImage={setTempProfileImage} />
      <EditInfo
        currentUser={currentUser}
        setTempDisplayName={setTempDisplayName}
        setTempProfileText={setTempProfileText}
      />
      <button className={style.saveButton} onClick={handleSaveInfo}>
        Save Changes
      </button>
      <Modal isShowing={notify.isShowing} message={notify.message} toggle={notify.toggle} />
    </div>
  )
}

export default EditProfilePage

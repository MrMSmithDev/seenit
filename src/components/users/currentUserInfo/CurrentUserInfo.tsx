import { useAuth, useUsers } from '@hooks/index'
import React, { useEffect, useState } from 'react'
import Loading from '@components/loading'
import { UserType } from 'src/customTypes/types'

import style from './CurrentUserInfo.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const CurrentUserInfo: React.FC = () => {
  const { user } = useAuth()
  const { getUsersFavoriteCount, loadUserProfile } = useUsers()

  const [loading, setLoading] = useState<boolean>(true)
  const [usersFavoriteCount, setUsersFavoriteCount] = useState<number>(0)
  const [currentUser, setCurrentUser] = useState<UserType>({
    uid: '',
    displayName: '',
    photoURL: ''
  })

  useEffect(() => {
    if (user) {
      const loadProfile = async () => {
        const activeUser = await loadUserProfile(user.uid)
        setCurrentUser(activeUser)
        setLoading(false)
      }

      loadProfile()
    }
  }, [user])

  if (loading) return <Loading />

  return (
    <div className={style.currentUserContainer}>
      <img className={style.userImg} src={currentUser.photoURL} referrerPolicy="no-referrer" />
      <h1 className={style.userDisplayName}>{currentUser.displayName}</h1>
      <p>
        <FontAwesomeIcon className={style.faIcon} icon={faStar} /> {}
      </p>
      <p className={style.userProfileBlurb}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat
        mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper
        suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor
        mauris sit amet orci. Aenean dignissim pellentesque felis. Morbi in sem quis dui placerat
        ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras
        consequat. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu
        vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan
        porttitor, facilisis luctus, metus.
      </p>
      <button className={style.editProfileButton} type="button">
        Edit Profile
      </button>
    </div>
  )
}

export default CurrentUserInfo

import React, { useEffect, useState } from 'react'

import { useAuth, useFirestore } from '@hooks/index'
import style from './Post.module.scss'
import { UserType, PostType } from 'src/customTypes/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as hollowStar, faMessage } from '@fortawesome/free-regular-svg-icons'

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

interface PostProps {
  currentPost: PostType
  isPreview: boolean
}

const Post: React.FC<PostProps> = ({ currentPost, isPreview }) => {
  const [userHasFavorite, setUserHasFavorite] = useState(false)
  const [author, setAuthor] = useState<UserType>({ uid: '', displayName: ' ', photoURL: '' })

  const { user } = useAuth()
  const { checkFavoriteStatus, loadUserProfile } = useFirestore()

  useEffect(() => {
    const loadAuthorProfile = async () => {
      const firestoreAuthor = await loadUserProfile(currentPost.authorID)
      setAuthor(firestoreAuthor)
    }

    loadAuthorProfile()
  }, [])

  useEffect(() => {
    const loadFavoriteStatus = async () => {
      if (user) {
        const favoriteStatus = await checkFavoriteStatus(user.uid, currentPost.ID)
        setUserHasFavorite(favoriteStatus)
      }
    }

    loadFavoriteStatus()
  }, [])

  const postStyle = isPreview ? `${style.post} ${style.postPreview}` : style.postBody

  function toggleFavorite(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    setUserHasFavorite(!userHasFavorite)
  }

  const timePosted = currentPost.timeStamp.toDate()

  return (
    <div className={postStyle} data-post-id={currentPost.ID}>
      <p className={style.headline}>
        <button className={style.favoriteButton} onClick={toggleFavorite}>
          <FontAwesomeIcon
            className={style.starIcon}
            icon={userHasFavorite ? solidStar : hollowStar}
          />
        </button>
        <span className={style.postTitle}>{currentPost.title}</span>
      </p>
      <p className={style.postBody}>{currentPost.body}</p>
      <div className={style.postInfo}>
        <p className={style.postTimestamp}>
          {[
            `${timePosted.getHours()}:${timePosted.getMinutes()} `,
            `${months[timePosted.getMonth()]} ${timePosted.getFullYear()}`
          ]}
        </p>
        <p className={style.postCommentCount}>
          {currentPost.comments?.length || 0} <FontAwesomeIcon icon={faMessage} />
        </p>
        <p className={style.postFavoriteCount}>
          0 <FontAwesomeIcon className={style.starIcon} icon={solidStar} />
        </p>
        <div className={style.authorContainer}>
          <img className={style.postAuthorImg} src={author.photoURL} alt="User's image" />
          <p className={style.postAuthor}>{author.displayName}</p>
        </div>
      </div>
    </div>
  )
}

export default Post

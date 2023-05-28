import React, { ReactNode, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { useAuth, useFirestore } from '@hooks/index'
import { PostType, UserType } from 'src/customTypes/types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as hollowStar, faMessage } from '@fortawesome/free-regular-svg-icons'

import style from './Post.module.scss'

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

const Post: React.FC = () => {
  const { postID } = useParams()
  const { user } = useAuth()
  const {
    checkFavoriteStatus,
    loadCurrentPost,
    loadUserProfile,
    setFavoriteStatus,
    incrementFavoriteCount,
    decrementFavoriteCount
  } = useFirestore()

  const [currentPost, setCurrentPost] = useState<PostType | null>(null)
  const [favoriteCount, setFavoriteCount] = useState<number>(0)
  const [userHasFavorite, setUserHasFavorite] = useState(false)
  const [author, setAuthor] = useState<UserType>({ uid: '', displayName: '', photoURL: '' })

  useEffect(() => {
    const loadPost = async () => {
      const retrievedPost = await loadCurrentPost(postID!)
      setCurrentPost(retrievedPost)
    }

    loadPost()
  }, [])

  useEffect(() => {
    const loadFavoriteStatus = async () => {
      if (user) {
        const favoriteStatus = await checkFavoriteStatus(user.uid, postID!)
        setUserHasFavorite(favoriteStatus)
      }
    }

    loadFavoriteStatus()
    if (currentPost) setFavoriteCount(currentPost.favorites!)
  }, [currentPost, user])

  useEffect(() => {
    if (currentPost) {
      const loadAuthorProfile = async () => {
        const firestoreAuthor = await loadUserProfile(currentPost.authorID)
        setAuthor(firestoreAuthor)
      }

      loadAuthorProfile()
    }
  }, [currentPost])

  let post: ReactNode

  function toggleFavorite(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    setFavoriteStatus(user!.uid, currentPost!.ID)
    if (!userHasFavorite) {
      incrementFavoriteCount(currentPost!.ID)
      setFavoriteCount((prevCount) => prevCount + 1)
    } else {
      decrementFavoriteCount(currentPost!.ID)
      setFavoriteCount((prevCount) => prevCount - 1)
    }
    setUserHasFavorite(!userHasFavorite)
  }

  if (currentPost) {
    const timePosted = currentPost.timeStamp!.toDate()

    post = (
      <div className={style.post}>
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
            {favoriteCount}
            <FontAwesomeIcon className={style.starIcon} icon={solidStar} />
          </p>
          <div className={style.authorContainer}>
            <img className={style.postAuthorImg} src={author.photoURL} alt="User's image" />
            <p className={style.postAuthor}>{author.displayName}</p>
          </div>
        </div>
      </div>
    )
  } else {
    post = <div>Loading</div>
  }

  return <React.Fragment>{post}</React.Fragment>
}

export default Post

import React, { ReactNode, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { useAuth, usePosts, useUsers } from '@hooks/index'
import { PostType, UserType } from 'src/customTypes/types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as hollowStar, faMessage } from '@fortawesome/free-regular-svg-icons'
import months from '@utils/months.js'

import style from './Post.module.scss'
import Loading from '@components/loading'

interface PostProps {
  currentPost: PostType
}

const Post: React.FC<PostProps> = ({ currentPost }) => {
  const { postID } = useParams()
  const { user } = useAuth()
  const { checkFavoriteStatus, setFavoriteStatus, incrementFavoriteCount } = usePosts()
  const { loadUserProfile } = useUsers()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [favoriteCount, setFavoriteCount] = useState<number>(0)
  const [userHasFavorite, setUserHasFavorite] = useState(false)
  const [author, setAuthor] = useState<UserType>({ uid: '', displayName: '', photoURL: '' })

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
      setIsLoading(false)
    }
  }, [currentPost])

  let post: ReactNode

  function toggleFavorite() {
    setFavoriteStatus(user!.uid, currentPost.ID)
    if (!userHasFavorite) {
      incrementFavoriteCount(currentPost.ID, 1)
      setFavoriteCount((prevCount) => prevCount + 1)
    } else {
      incrementFavoriteCount(currentPost.ID, -1)
      setFavoriteCount((prevCount) => prevCount - 1)
    }
    setUserHasFavorite(!userHasFavorite)
  }

  if (isLoading) return <Loading />

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
              `${timePosted.getDate()} ${months[timePosted.getMonth()]} ${timePosted.getFullYear()}`
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

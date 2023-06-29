import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { useAuth, usePosts, useUsers } from '@hooks/index'
import { PostType, UserType } from 'src/customTypes/types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as hollowStar, faMessage } from '@fortawesome/free-regular-svg-icons'
import { months } from '@utils/misc/index'

import style from './Post.module.scss'
import Loading from '@components/loading'
import AuthorInfo from '@components/users/authorInfo'

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
  const [userHasFavorite, setUserHasFavorite] = useState<boolean>(false)
  const [author, setAuthor] = useState<UserType>({
    uid: '',
    displayName: '',
    photoURL: '',
    blurb: ''
  })

  useEffect(() => {
    const loadFavoriteStatus = async (): Promise<void> => {
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
      const loadAuthorProfile = async (): Promise<void> => {
        const firestoreAuthor = await loadUserProfile(currentPost.authorID)
        setAuthor(firestoreAuthor)
      }

      loadAuthorProfile()
      setIsLoading(false)
    }
  }, [currentPost])

  function toggleFavorite(): void {
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

  let postImage: React.ReactNode | null = null

  if (currentPost.imageUrl)
    postImage = <img className={style.postImage} src={currentPost.imageUrl} />

  if (isLoading) return <Loading />

  const timePosted: Date = currentPost.timeStamp!.toDate()

  return (
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
      {postImage}
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
        <AuthorInfo author={author} bold={true} link={true} />
      </div>
    </div>
  )
}

export default Post

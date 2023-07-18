import React, { useEffect, useState } from 'react'
import PostControls from '@components/posting/postControls'

import { useParams } from 'react-router-dom'
import { useAuth, usePosts, useUsers } from '@hooks/index'
import { PostType, UserType } from 'src/customTypes/types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as hollowStar, faMessage } from '@fortawesome/free-regular-svg-icons'

import style from './Post.module.scss'
import Loading from '@components/loading'
import AuthorInfo from '@components/users/authorInfo'
import formatTime from '@utils/formatTime'

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
    blurb: '',
    posts: 0,
    comments: 0
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
        if (firestoreAuthor) setAuthor(firestoreAuthor)
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
  let postControls: React.ReactNode | null = null

  if (currentPost.imageUrl)
    postImage = <img className={style.postImage} src={currentPost.imageUrl} />

  if (user && currentPost.authorID === user.uid) {
    postControls = <PostControls postID={currentPost.ID} />
  }

  if (isLoading) return <Loading />

  const timePosted: Date = currentPost.timeStamp!.toDate()
  const formattedTime: string = formatTime(timePosted)

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
      {postControls}
      {postImage}
      <p className={style.postBody}>{currentPost.body}</p>
      {currentPost.edited ? <p className={style.edited}>* This post has been edited *</p> : null}
      <div className={style.postInfo}>
        <p className={style.postTimestamp}>{formattedTime}</p>
        <div className={style.postCounts}>
          <p className={style.postCommentCount}>
            {currentPost.comments?.length || 0} <FontAwesomeIcon icon={faMessage} />
          </p>
          <p className={style.postFavoriteCount}>
            {favoriteCount}
            <FontAwesomeIcon className={style.starIcon} icon={solidStar} />
          </p>
        </div>
        <AuthorInfo author={author} bold={true} link={true} />
      </div>
    </div>
  )
}

export default Post

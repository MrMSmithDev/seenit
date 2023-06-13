import React, { useEffect, useState } from 'react'

import { useAuth, usePosts, useUsers } from '@hooks/index'
import style from './PostPreview.module.scss'
import { UserType, PostType } from 'src/customTypes/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as hollowStar, faMessage } from '@fortawesome/free-regular-svg-icons'
import { PostLink } from '@routes/posts'
import AuthorInfo from '@components/users/authorInfo'

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const generateAddressTitle = (title: string) => {
  return title.toLowerCase().replace(/[^a-z0-9␣]/gi, '')
}

interface PostProps {
  currentPost: PostType
}

const PostPreview: React.FC<PostProps> = ({ currentPost }) => {
  const [userHasFavorite, setUserHasFavorite] = useState(false)
  const [favoriteCount, setFavoriteCount] = useState<number>(currentPost.favorites!)
  const [author, setAuthor] = useState<UserType>({ uid: '', displayName: ' ', photoURL: '' })

  const { ID, authorID, timeStamp, title, comments } = currentPost

  const { user } = useAuth()
  const { checkFavoriteStatus, setFavoriteStatus, incrementFavoriteCount } = usePosts()
  const { loadUserProfile } = useUsers()

  useEffect((): void => {
    const loadAuthorProfile = async (): Promise<void> => {
      const firestoreAuthor: UserType = await loadUserProfile(authorID)
      setAuthor(firestoreAuthor)
    }

    loadAuthorProfile()
  }, [])

  useEffect((): void => {
    const loadFavoriteStatus = async (): Promise<void> => {
      if (user) {
        const favoriteStatus: boolean = await checkFavoriteStatus(user.uid, currentPost.ID)
        setUserHasFavorite(favoriteStatus)
      }
    }

    loadFavoriteStatus()
  }, [user])

  function toggleFavorite(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()
    setFavoriteStatus(user!.uid, ID)
    if (!userHasFavorite) {
      incrementFavoriteCount(ID, 1)
      setFavoriteCount((prevCount) => prevCount + 1)
    } else {
      incrementFavoriteCount(ID, -1)
      setFavoriteCount((prevCount) => prevCount - 1)
    }
    setUserHasFavorite(!userHasFavorite)
  }

  const timePosted: Date = timeStamp!.toDate()
  const postAddressTitle: string = generateAddressTitle(title)

  const postComponent = (
    <div className={`${style.post} ${style.postPreview}`} data-post-id={ID}>
      <p className={style.headline}>
        <button className={style.favoriteButton} onClick={toggleFavorite}>
          <FontAwesomeIcon
            className={style.starIcon}
            icon={userHasFavorite ? solidStar : hollowStar}
          />
        </button>
        <span className={style.postTitle}>{title}</span>
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
          {comments?.length || 0} <FontAwesomeIcon icon={faMessage} />
        </p>
        <p className={style.postFavoriteCount}>
          {favoriteCount}
          <FontAwesomeIcon className={style.starIcon} icon={solidStar} />
        </p>
        <AuthorInfo author={author} bold={true} />
      </div>
    </div>
  )

  return (
    <PostLink postID={ID} postTitle={postAddressTitle}>
      {postComponent}
    </PostLink>
  )
}

export default PostPreview

import React, { useEffect, useState } from 'react'
import AuthorInfo from '@components/users/authorInfo'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth, usePosts, useUsers } from '@hooks/index'
import { PostLink } from '@routes/posts'
import formatTime from '@utils/formatTime'
import generateAddressTitle from '@utils/generateAddressTitle'
import { PostType, UserType } from 'src/customTypes/types'

import PostHeadline from '../postHeadline'

import style from './PostPreview.module.scss'

interface PostProps {
  currentPost: PostType
}

const PostPreview: React.FC<PostProps> = ({ currentPost }) => {
  const [userHasFavorite, setUserHasFavorite] = useState(false)
  const [favoriteCount, setFavoriteCount] = useState<number>(currentPost.favorites || 0)
  const [author, setAuthor] = useState<UserType>({
    uid: '',
    displayName: '',
    photoURL: '',
    blurb: '',
    comments: 0,
    posts: 0
  })

  const { ID, authorID, timeStamp, title, comments } = currentPost

  const { user } = useAuth()
  const { checkFavoriteStatus, setFavoriteStatus, incrementFavoriteCount } = usePosts()
  const { loadUserProfile } = useUsers()

  useEffect((): void => {
    const loadAuthorProfile = async (): Promise<void> => {
      const firestoreAuthor: UserType = await loadUserProfile(authorID)
      if (firestoreAuthor) setAuthor(firestoreAuthor)
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

  let postImage: React.ReactNode | null = null

  if (currentPost.imageUrl)
    postImage = <img className={style.postImage} src={currentPost.imageUrl} />

  // Set bodyLength of preview depending on image
  const bodyLength: number = postImage ? 1 : 3

  // Set time if post not deleted else return now
  const timePosted: Date = timeStamp ? timeStamp.toDate() : new Date()
  const formattedTime: string = formatTime(timePosted)
  const postAddressTitle: string = generateAddressTitle(title)

  const postComponent = (
    <div
      className={`${style.post} ${style.postPreview}`}
      data-post-id={ID}
      data-testid="post-preview"
    >
      <PostHeadline
        title={currentPost.title}
        toggleFavorite={toggleFavorite}
        userHasFavorite={userHasFavorite}
        preview={true}
      />
      {postImage}
      <p className={style.postBody} style={{ WebkitLineClamp: bodyLength }}>
        {currentPost.body}
      </p>
      <div className={style.postInfo}>
        <p className={style.postTimestamp}>{formattedTime}</p>
        <div className={style.postCounts}>
          <p className={style.postCommentCount}>
            {comments?.length || 0} <FontAwesomeIcon icon={faMessage} />
          </p>
          <p className={style.postFavoriteCount}>
            {favoriteCount ? favoriteCount : 0}
            <FontAwesomeIcon className={style.starIcon} icon={solidStar} />
          </p>
        </div>
        <AuthorInfo author={author} bold={true} preview={true} />
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

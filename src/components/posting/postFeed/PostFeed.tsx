/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { ReactNode, useEffect, useState } from 'react'
import PostPreview from '@components/posting/postPreview'

import style from './PostFeed.module.scss'
import { FilterQuery, PostType } from 'src/customTypes/types'
import { usePosts, useUsers } from '@hooks/index'
import PostFilterBar from '@components/posting/postFilterBar'
import { useParams } from 'react-router-dom'
import Loading from '@components/loading'

function filterSwitch(filter: string): FilterQuery {
  // default is set to newest
  switch (filter.toLowerCase()) {
    case 'oldest':
      return { attribute: 'timeStamp', order: 'asc' }
    case 'top rated':
      return { attribute: 'favorites', order: 'desc' }
    case 'lowest rated':
      return { attribute: 'favorites', order: 'asc' }
    default:
      return { attribute: 'timeStamp', order: 'desc' }
  }
}

function saveFilterToLocal(filter: string): void {
  localStorage.setItem('filter', filter)
}

interface PostFeedProps {
  feedTitle: string
  constraint?: string
}

const PostFeed: React.FC<PostFeedProps> = ({ feedTitle, constraint }) => {
  const { userID } = useParams()
  const [title, setTitle] = useState<string>(feedTitle)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPosts, setCurrentPosts] = useState<PostType[]>([])
  const [filter, setFilter] = useState<string>('newest')

  const { loadPostFeed, loadUserFavorites } = usePosts()
  const { getUsersDisplayName } = useUsers()

  useEffect((): void => {
    // Load locally stored filter value
    const savedFilterSetting: string | null = localStorage.getItem('filter')
    if (savedFilterSetting) setFilter(savedFilterSetting)
  })

  useEffect((): void => {
    const createTitle = async () => {
      const tempTitle = `${await getUsersDisplayName(userID!)}'s ${feedTitle}`
      setTitle(tempTitle)
    }

    if (userID) createTitle()
    else setTitle(feedTitle)
  }, [userID])

  useEffect((): void => {
    const fetchPosts = async (): Promise<void> => {
      let posts
      const queryConstraints: FilterQuery = filterSwitch(filter)
      if (userID && constraint === 'favorites')
        posts = await loadUserFavorites(userID, queryConstraints)
      else posts = await loadPostFeed(queryConstraints)
      setCurrentPosts(posts)
      if (posts) setIsLoading(false)
    }

    fetchPosts()
  }, [filter, feedTitle])

  const handleFilterChange = (newFilterSetting: string) => {
    setFilter(newFilterSetting)
    saveFilterToLocal(newFilterSetting)
  }

  const postArr: ReactNode[] = currentPosts.map((post: PostType) => {
    return <PostPreview currentPost={post} key={post.ID} />
  })

  if (isLoading) return <Loading />

  return (
    <div className={style.postFeedContainer}>
      <PostFilterBar
        feedTitle={title}
        filterSetting={filter}
        handleFilterChange={handleFilterChange}
      />
      <div className={style.postFeed}>{postArr}</div>
    </div>
  )
}

export default PostFeed

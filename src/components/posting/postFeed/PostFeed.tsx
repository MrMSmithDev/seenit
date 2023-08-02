/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { ReactNode, useEffect, useState } from 'react'
import PostPreview from '@components/posting/postPreview'

import style from './PostFeed.module.scss'
import { FilterQuery, PostType } from 'src/customTypes/types'
import { useInfiniteScroll, useUsers } from '@hooks/index'
import PostFilterBar from '@components/posting/postFilterBar'
import { useParams } from 'react-router-dom'
import Loading from '@components/loading'

function filterSwitch(filter: string): FilterQuery {
  // default is set to newest
  switch (filter.toLowerCase()) {
    case 'newest':
      return { attribute: 'timeStamp', order: 'desc' }
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
  const [filter, setFilter] = useState<string>('newest')
  const [queryConstraints, setQueryConstraints] = useState<FilterQuery>(filterSwitch(filter))
  const [currentPosts, setCurrentPosts] = useState<PostType[]>([])
  const [resetPosts, setResetPosts] = useState<boolean>(false)

  const { posts, getPosts, loadScroll, clearPosts } = useInfiniteScroll()
  const { getUsersDisplayName } = useUsers()

  useEffect((): void => {
    // Load locally stored filter value
    const savedFilterSetting: string | null = localStorage.getItem('filter')
    if (savedFilterSetting) {
      setFilter(savedFilterSetting)
    }
  }, [])

  useEffect((): void => {
    // On initial load, don't call API
    // if (isLoading) return
    // if (currentPosts.length > 0) clearPosts()
    setQueryConstraints(filterSwitch(filter))
    setResetPosts(true)
  }, [filter])

  useEffect((): void => {
    const createTitle = async () => {
      const tempTitle = `${await getUsersDisplayName(userID!)}'s ${feedTitle}`
      setTitle(tempTitle)
    }

    if (userID) createTitle()
    else setTitle(feedTitle)
  }, [userID])

  useEffect((): void => {
    const setPosts = async (): Promise<void> => {
      const fetchPosts = async (): Promise<void> => {
        if (resetPosts) {
          clearPosts()
        }

        if (userID && constraint === 'favorites') await loadScroll(queryConstraints, userID)
        else await loadScroll(queryConstraints)
      }

      await fetchPosts()
      setIsLoading(false)
    }

    setPosts()
  }, [resetPosts])

  useEffect(() => {
    const handleScroll = async (): Promise<void> => {
      const isNearingBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500
      if (isNearingBottom) {
        if (userID && constraint === 'favorites') await loadScroll(queryConstraints, userID)
        else await loadScroll(queryConstraints)
      }
      setCurrentPosts(posts)
      getPosts()
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import PostPreview from '@components/posting/postPreview'

import style from './PostFeed.module.scss'
import { FilterQuery, PostType } from 'src/customTypes/types'
import { useInfiniteScroll, useUsers } from '@hooks/index'
import PostFilterBar from '@components/posting/postFilterBar'
import { useParams } from 'react-router-dom'
import { filterSwitch } from '@utils/filters'
import Loading from '@components/loading'

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
  const [queryConstraints, setQueryState] = useState<FilterQuery>(filterSwitch(filter))
  const [resetPosts, setResetPosts] = useState<boolean>(true)

  const queryConstraintsRef = useRef<FilterQuery>(queryConstraints)
  const setQueryConstraints = (newConstraints: FilterQuery): void => {
    queryConstraintsRef.current = newConstraints
    setQueryState(newConstraints)
  }

  const { posts, loadScroll, clearPosts } = useInfiniteScroll()
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
    if (isLoading) return

    // On filter change or userID change, reset scroll
    setResetPosts(true)
    setQueryConstraints(filterSwitch(filter))
  }, [filter, userID])

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
          setResetPosts(false)
        }

        if (userID) await loadScroll(queryConstraints, userID)
        else await loadScroll(queryConstraints)
      }

      await fetchPosts()
      setIsLoading(false)
    }

    if (resetPosts) setPosts()
  }, [resetPosts])

  useEffect(() => {
    const handleScroll = async (): Promise<void> => {
      const isNearingBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500
      if (isNearingBottom) {
        if (userID && constraint === 'favorites')
          await loadScroll(queryConstraintsRef.current, userID)
        else await loadScroll(queryConstraintsRef.current)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleFilterChange = (newFilterSetting: string) => {
    setFilter(newFilterSetting)
    saveFilterToLocal(newFilterSetting)
  }

  const postArr: ReactNode[] = posts.map((post: PostType) => {
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

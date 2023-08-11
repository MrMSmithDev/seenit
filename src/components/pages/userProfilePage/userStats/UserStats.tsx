import React, { useEffect, useState } from 'react'
import { useUsers } from '@hooks/index'
import { StatsType, UserType } from 'src/customTypes/types'

import style from './UserStats.module.scss'

interface UserStatsProps {
  user: UserType
}

const UserStats: React.FC<UserStatsProps> = ({ user }) => {
  const { getUsersStats } = useUsers()
  const [userStats, setUserStats] = useState<StatsType>()

  useEffect(() => {
    if (!userStats) {
      const loadStats = async () => {
        const retrievedStats: StatsType = await getUsersStats(user.uid)
        setUserStats(retrievedStats)
      }
      loadStats()
    }
  }, [])

  if (!userStats) return null

  return (
    <div className={style.userStatsContainer}>
      <p className={style.statPara}>{userStats.posts} posts</p>
      <p className={style.statPara}>{userStats.comments} comments</p>
      <p className={style.statPara}>{userStats.favorites} favorites</p>
    </div>
  )
}

export default UserStats

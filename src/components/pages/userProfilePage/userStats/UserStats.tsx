import { useUsers } from '@hooks/index'
import React, { useEffect, useState } from 'react'
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
      <p className={style.statPara}>
        <span className={style.statNum}>{userStats.posts}</span> posts
      </p>
      <p className={style.statPara}>
        <span className={style.statNum}>{userStats.posts}</span> comments
      </p>
      <p className={style.statPara}>
        <span className={style.statNum}>{userStats.posts}</span> favorites
      </p>
    </div>
  )
}

export default UserStats

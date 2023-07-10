import React, { useEffect, useState } from 'react'
import { UserType } from 'src/customTypes/types'

import style from './UserStats.module.scss'

interface StatsType {
  favorites: number
  posts: number
  comments: number
}

interface UserStatsProps {
  user: UserType
}

const UserStats: React.FC<UserStatsProps> = ({ user }) => {
  const [userStats, setuserStats] = useState()
  useEffect(() => {
    const loadUserStats = async (): Promise<StatsType> => {}

    const retrievedStats = loadUserStats()
  })

  return <div className={style.userStatsContainer}></div>
}

export default UserStats

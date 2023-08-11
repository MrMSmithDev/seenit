import React from 'react'
import UserBarSlim from '@components/userBar/userBarSlim'
import UserBarWide from '@components/userBar/userBarWide'
import useAuth from '@hooks/useAuth'

const UserBar: React.FC = () => {
  const { user } = useAuth()

  return (
    <div>
      <UserBarWide user={user!} />
      <UserBarSlim user={user!} />
    </div>
  )
}

export default UserBar

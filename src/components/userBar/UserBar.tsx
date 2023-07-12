import React from 'react'
import useAuth from '@hooks/useAuth'

import UserBarWide from '@components/userBar/userBarWide'
import UserBarSlim from '@components/userBar/userBarSlim'

const UserBar: React.FC = () => {
  const { user } = useAuth()

  return (
    <React.Fragment>
      <UserBarWide user={user!} />
      <UserBarSlim user={user!} />
    </React.Fragment>
  )
}

export default UserBar

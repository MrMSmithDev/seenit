import { useEffect, useState } from 'react'
import { FilterQuery, PostType } from 'src/customTypes/types'

function useModal(queryConstraints: FilterQuery, userID: string | null = null) {
  const [posts, setPosts] = useState<PostType[]>([])

  return {
    posts
  }
}

export default useModal

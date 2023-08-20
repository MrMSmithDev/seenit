import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import ConfirmModal from '@components/modal/confirmModal'
import { usePosts } from '@hooks/index'
import useConfirm from '@hooks/useConfirm/useConfirm'

import style from './PostControls.module.scss'

interface PostControlsProps {
  postID: string
}

const PostControls: React.FC<PostControlsProps> = ({ postID }) => {
  const navigate: NavigateFunction = useNavigate()
  const { deletePost } = usePosts()

  const confirm = useConfirm()

  const editOnClick = (): void => {
    navigate(`/posts/${postID}/edit`)
  }

  const deleteOnClick = (): void => {
    confirm.toggle('Are you sure you want to delete this post? This action cannot be undone')
  }

  return (
    <div className={style.postControlsContainer}>
      <button className={style.postControl} onClick={editOnClick}>
        Edit
      </button>
      <button className={style.postControl} onClick={deleteOnClick}>
        Delete
      </button>
      <ConfirmModal
        message={confirm.message}
        isShowing={confirm.isShowing}
        toggle={confirm.toggle}
        callbackFunction={async (): Promise<void> => {
          const result = await deletePost(postID)
          if (result.success) navigate('/')
        }}
      />
    </div>
  )
}

export default PostControls

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

  const deleteOnClick = async (): Promise<void> => {
    confirm.toggle('', async (): Promise<void> => {
      const result = await deletePost(postID)
      if (result.success) navigate('/')
    })
    const result = await deletePost(postID)
    if (result.success) navigate('/')
  }

  return (
    <div className={style.postControlsContainer}>
      <button className={style.postControl} onClick={editOnClick}>
        Edit
      </button>
      <button className={style.postControl} onClick={deleteOnClick} disabled={true}>
        Delete
      </button>
      <ConfirmModal
        message={confirm.message}
        isShowing={confirm.isShowing}
        toggle={confirm.toggle}
        callbackFunction={confirm.callbackFunction}
      />
    </div>
  )
}

export default PostControls

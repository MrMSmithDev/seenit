import { useAuth, usePosts } from '@hooks/index'
import React, { useState } from 'react'
import { PostType } from 'src/customTypes/types'

import style from './NewPostForm.module.scss'

const NewPost: React.FC = () => {
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const { user } = useAuth()
  const { writePost } = usePosts()

  const writeNewPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const postObject: PostType = {
      ID: '',
      authorID: user!.uid,
      title: postTitle,
      body: postBody
    }
    await writePost(postObject)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value)
  }

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostBody(e.target.value)
  }

  return (
    <div className={style.newPostContainer}>
      <h1 className={style.newPostTitle}>New Post</h1>
      <form className={style.newPostForm}>
        <div className={style.inputContainer}>
          <label htmlFor="post-title">Post Title</label>
          <input
            type="text"
            id="post-title"
            name="post-title"
            onChange={handleTitleChange}
            minLength={3}
            maxLength={120}
            required
          />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="post-image">Add Image</label>
          <input type="file" />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="">Post Body</label>
          <textarea
            id="post-body"
            name="post-body"
            onChange={handleBodyChange}
            minLength={10}
            required
          />
        </div>
        <button type="submit" onClick={writeNewPost}>
          Publish
        </button>
      </form>
    </div>
  )
}

export default NewPost

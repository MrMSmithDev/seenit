import { useAuth, usePosts } from '@hooks/index'
import React, { useEffect, useState } from 'react'
import { PostType } from 'src/customTypes/types'
import { useNavigate } from 'react-router-dom'

import style from './NewPostForm.module.scss'

const NewPost: React.FC = () => {
  const [postTitle, setPostTitle] = useState<string>('')
  const [postImage, setPostImage] = useState<File | null>()
  const [postBody, setPostBody] = useState<string>('')
  const [imagePreview, setImagePreview] = useState<string | null>()

  const { user } = useAuth()
  const { writePost } = usePosts()

  const navigate = useNavigate()

  useEffect((): void => {
    if (postImage) {
      const previewURL = URL.createObjectURL(postImage)
      setImagePreview(previewURL)
    }
  }, [postImage])

  const setNewImage = (imageFile: File | null): void => {
    setPostImage(imageFile)
    if (imageFile != null) {
      const previewURL: string = URL.createObjectURL(imageFile)
      setImagePreview(previewURL)
    } else {
      setImagePreview(null)
    }
  }

  const writeNewPost = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault()
    const postObject: PostType = {
      ID: '',
      authorID: user!.uid,
      title: postTitle,
      body: postBody,
      image: postImage
    }
    await writePost(postObject)
    navigate('/')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPostTitle(e.target.value)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files: FileList | null = (e.target as HTMLInputElement).files
    if (files && files[0] && files[0].type.match(/image.*/)) {
      const imageFile: File = files[0]
      setNewImage(imageFile)
    } else setNewImage(null)
  }

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setPostBody(e.target.value)
  }

  // TODO: Create logic to toggle publish button if inputs not validated

  const imagePreviewElement = imagePreview ? (
    <div className={style.imagePreviewContainer}>
      <img className={style.imagePreview} src={imagePreview} />
    </div>
  ) : null

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
            placeholder="required"
            required
          />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="post-image">Add Image</label>
          <input className={style.imageInput} type="file" onChange={handleImageChange} />
        </div>
        {imagePreviewElement}
        <div className={style.inputContainer}>
          <label htmlFor="">Post Body</label>
          <textarea
            id="post-body"
            name="post-body"
            onChange={handleBodyChange}
            minLength={10}
            placeholder="required"
            required
          />
        </div>
      </form>
      <button className={style.postSubmitButton} onClick={writeNewPost}>
        Publish
      </button>
    </div>
  )
}

export default NewPost

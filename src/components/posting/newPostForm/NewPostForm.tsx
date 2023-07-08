import { useAuth, useNotification, usePosts } from '@hooks/index'
import React, { useEffect, useState } from 'react'
import { ApiReturn, PostType } from 'src/customTypes/types'
import { useNavigate } from 'react-router-dom'
import Modal from '@components/modal'

import style from './NewPostForm.module.scss'
import generateAddressTitle from '@utils/generateAddressTitle'

const NewPost: React.FC = () => {
  const [postTitle, setPostTitle] = useState<string>('')
  const [postImage, setPostImage] = useState<File | null>()
  const [postBody, setPostBody] = useState<string>('')
  const [imagePreview, setImagePreview] = useState<string | null>()
  const [isValid, setIsValid] = useState<boolean>(false)

  const { user } = useAuth()
  const { writePost } = usePosts()
  const notify = useNotification()
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

  useEffect((): void => {
    if (!postImage && postBody.length == 0) setIsValid(false)
    else setIsValid(true)
  }, [postTitle, postImage, postBody])

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

  const writeNewPost = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault()
    const postObject: PostType = {
      ID: '',
      authorID: user!.uid,
      title: postTitle,
      body: postBody,
      image: postImage
    }
    const result: ApiReturn = await writePost(postObject)
    if (result.success) {
      navigate(`/${result.reference?.path}/${generateAddressTitle(postTitle)}`)
      notify.toggle('Post Published')
    } else {
      navigate('/')
      notify.toggle('Error publishing post')
    }
  }

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
        <p
          className={style.postRequirements}
          style={isValid ? { display: 'none' } : { display: 'block' }}
        >
          You must include a title with an image or a body that has a length of at least 5 to
          publish this post
        </p>
      </form>
      <button
        className={style.postSubmitButton}
        onClick={writeNewPost}
        style={isValid ? { opacity: 1 } : { opacity: 0.2 }}
        disabled={!isValid}
      >
        Publish
      </button>
      <Modal isShowing={notify.isShowing} toggle={notify.toggle} message={notify.message} />
    </div>
  )
}

export default NewPost

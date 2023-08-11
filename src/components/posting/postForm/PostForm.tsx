import { useAuth, useNotification, usePosts } from '@hooks/index'
import React, { useEffect, useState } from 'react'
import { ApiReturn, PostEdit, PostType } from 'src/customTypes/types'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '@components/modal'

import style from './PostForm.module.scss'
import generateAddressTitle from '@utils/generateAddressTitle'
import imageUrlToFile from '@utils/imageUrlToFile'

interface PostFormProps {
  toEdit?: boolean
}

const PostForm: React.FC<PostFormProps> = ({ toEdit = false }) => {
  const [postTitle, setPostTitle] = useState<string>('')
  const [postImage, setPostImage] = useState<File | null>()
  const [postBody, setPostBody] = useState<string>('')
  const [imagePreview, setImagePreview] = useState<string | null>()
  const [isValid, setIsValid] = useState<boolean>(false)

  const { user } = useAuth()
  const { writePost, editPost, loadCurrentPost } = usePosts()
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
    if (!!postTitle && (!!postImage || postBody.length > 0)) setIsValid(true)
    else setIsValid(false)
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

  // If editing a post, retrieve postID from URL parameters
  const { postID } = useParams()

  useEffect((): void => {
    if (postID) {
      const loadPost = async () => {
        const postToEdit = await loadCurrentPost(postID)
        if (postToEdit) {
          setPostTitle(postToEdit.title)
          setPostBody(postToEdit.body)
          if (postToEdit.imageUrl) {
            const imageFile: File = await imageUrlToFile(postToEdit.imageUrl)
            setPostImage(imageFile) // THIS IS USELESS. DELETE
          }
        }
      }
      loadPost()
    }
  }, [postID])

  const writeNewPost = async (): Promise<void> => {
    const postObject: PostType = {
      ID: '',
      authorID: user!.uid,
      title: postTitle,
      body: postBody,
      image: postImage
    }
    const result: ApiReturn = await writePost(postObject)
    if (result.success) {
      navigate(`/posts/${result.id!}/${generateAddressTitle(postTitle)}`)
      notify.toggle('Post published')
    } else {
      notify.toggle(`${result.error}, please try again later`)
    }
  }

  const makePostEdit = async (): Promise<void> => {
    const postObject: PostEdit = {
      ID: postID!,
      title: postTitle,
      body: postBody
    }
    const result: ApiReturn = await editPost(postObject)
    if (result.success) {
      navigate(`/posts/${result.id}/${generateAddressTitle(postTitle)}`)
      notify.toggle('Post edited')
    } else {
      notify.toggle(`${result.error}, please try again later`)
    }
  }

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (postID) makePostEdit()
    else writeNewPost()
  }

  const imagePreviewElement = imagePreview ? (
    <div className={style.imagePreviewContainer}>
      <img className={style.imagePreview} src={imagePreview} />
    </div>
  ) : null

  return (
    <div className={style.newPostContainer}>
      <h1 className={style.newPostTitle}>{toEdit ? 'Edit' : 'New'} Post</h1>
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
            placeholder="Required"
            value={postTitle}
            required
          />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="post-image">Add Image</label>
          <input
            className={style.imageInput}
            type="file"
            onChange={handleImageChange}
            disabled={!!postID}
          />
        </div>
        <p
          className={style.postRequirements}
          style={!postID ? { display: 'none' } : { display: 'block' }}
        >
          Images cannot be added or changed when editing a post
        </p>
        {imagePreviewElement}
        <div className={style.inputContainer}>
          <label htmlFor="">Post Body</label>
          <textarea
            id="post-body"
            name="post-body"
            onChange={handleBodyChange}
            minLength={10}
            placeholder={!postImage ? 'Required' : 'Not required with an image'}
            value={postBody}
            required
          />
        </div>
        <p
          className={style.postRequirements}
          style={isValid ? { display: 'none' } : { display: 'block' }}
        >
          You must include a title with an image or a body that has a length of at least 5
          characters to publish this post
        </p>
      </form>
      <button className={style.postSubmitButton} onClick={submitForm} disabled={!isValid}>
        Publish
      </button>
      <Modal isShowing={notify.isShowing} toggle={notify.toggle} message={notify.message} />
    </div>
  )
}

export default PostForm

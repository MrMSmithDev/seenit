import React from 'react'

import style from './NewPost.module.scss'

const NewPost: React.FC = () => {
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
            minLength={3}
            maxLength={30}
            required
          />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="post-image">Add Image</label>
          <input type="file" />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="">Post Body</label>
          <textarea id="post-body" name="post-body" minLength={10} />
        </div>
      </form>
    </div>
  )
}

export default NewPost

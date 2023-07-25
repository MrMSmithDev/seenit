import { useEffect, useState } from 'react'

function useNotification() {
  const [isShowing, setIsShowing] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    let modalTimeout: NodeJS.Timeout
    if (isShowing) {
      modalTimeout = setTimeout(() => {
        setIsShowing(false)
      }, 3000)
    }

    return () => {
      if (modalTimeout) clearTimeout(modalTimeout)
    }
  }, [isShowing])

  function toggle(newMessage = '') {
    setMessage(newMessage)
    setIsShowing(!isShowing)
  }

  return {
    isShowing,
    message,
    toggle
  }
}

export default useNotification

import { useEffect, useState } from 'react'

function useModal() {
  const [isShowing, setIsShowing] = useState<boolean>(false)
  const [currentMessage, setCurrentMessage] = useState<string>('')

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

  function toggle(message = '') {
    setCurrentMessage(message)
    setIsShowing(!isShowing)
  }

  return {
    isShowing,
    currentMessage,
    toggle
  }
}

export default useModal

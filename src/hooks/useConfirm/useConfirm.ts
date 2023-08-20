import { useState } from 'react'

function useConfirm() {
  const [isShowing, setIsShowing] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  function toggle(newMessage = ''): void {
    setMessage(newMessage)
    setIsShowing(!isShowing)
  }

  return {
    isShowing,
    message,
    toggle
  }
}

export default useConfirm

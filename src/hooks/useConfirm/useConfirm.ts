import { useState } from 'react'

function useConfirm() {
  const [isShowing, setIsShowing] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [callbackFunction, setCallbackFunction] = useState<(() => Promise<void>) | null>(null)

  function toggle(newMessage = '', newCallbackFunction: (() => Promise<void>) | null = null): void {
    setMessage(newMessage)
    setCallbackFunction(newCallbackFunction)
    setIsShowing(!isShowing)
  }

  return {
    isShowing,
    message,
    toggle,
    callbackFunction
  }
}

export default useConfirm

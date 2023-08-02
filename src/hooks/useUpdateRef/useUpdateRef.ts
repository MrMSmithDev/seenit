import { useRef } from 'react'

function useUpdateRef<T>() {
  const ref = useRef<T>()
  const updateRef = (value: T) => {
    ref.current = value
  }
  return [ref, updateRef] as const
}

export default useUpdateRef

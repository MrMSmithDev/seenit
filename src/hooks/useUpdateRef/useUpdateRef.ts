import { useRef } from 'react'

function useUpdateRef<T>(value: T) {
  const ref = useRef<T>(value)
  const updateRef = (newValue: T) => {
    ref.current = newValue
  }
  return [ref, updateRef] as const
}

export default useUpdateRef

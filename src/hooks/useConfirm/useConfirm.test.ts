import useConfirm from './useConfirm'

describe('useConfirm', () => {
  // Tests that the confirm dialog is initially hidden
  it('should be initially hidden', () => {
    const { isShowing } = useConfirm()
    expect(isShowing).toBe(false)
  })

  // Tests that the confirm dialog is shown when the toggle function is called
  it('should be shown when toggle function is called', () => {
    const { isShowing, toggle } = useConfirm()
    toggle()
    expect(isShowing).toBe(true)
  })

  // Tests that the confirm dialog message is set when the toggle function is called with a message
  it('should set message when toggle function is called with a message', () => {
    const { message, toggle } = useConfirm()
    toggle('Are you sure?')
    expect(message).toBe('Are you sure?')
  })

  // Tests that the confirm dialog message is empty when the toggle function is called without a message
  it('should set empty message when toggle function is called without a message', () => {
    const { message, toggle } = useConfirm()
    toggle()
    expect(message).toBe('')
  })

  // Tests that the confirm dialog is hidden again when the toggle function is called twice
  it('should be hidden again when toggle function is called twice', () => {
    const { isShowing, toggle } = useConfirm()
    toggle()
    toggle()
    expect(isShowing).toBe(false)
  })

  // Tests that the confirm dialog is still hidden when the toggle function is called with a message, then called again without a message
  it('should still be hidden when toggle function is called with a message, then called again without a message', () => {
    const { isShowing, toggle } = useConfirm()
    toggle('Are you sure?')
    toggle()
    expect(isShowing).toBe(false)
  })
})

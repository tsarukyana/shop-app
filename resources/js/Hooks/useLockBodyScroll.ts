import { useEffect } from 'react'

const useLockBodyScroll = (isOpen: boolean) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow

    document.body.style.overflow = isOpen ? 'visible' : 'hidden'
    document.body.style.touchAction = isOpen ? 'unset' : 'none'

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [isOpen])
}

export default useLockBodyScroll

import { useEffect, useRef } from 'react'

interface InfiniteScrollTriggerProps {
  onLoadMore: () => void
  hasNextPage: boolean
  loading: boolean
  threshold?: number
  rootMargin?: string
}

export function InfiniteScrollTrigger({
  onLoadMore,
  hasNextPage,
  loading,
  threshold = 0,
  rootMargin = '200px',
}: InfiniteScrollTriggerProps) {
  const loaderRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!loaderRef.current) return

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    if (!loading && hasNextPage) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry.isIntersecting) {
            observerRef.current?.unobserve(entry.target)
            onLoadMore()
          }
        },
        { threshold, rootMargin }
      )

      observerRef.current.observe(loaderRef.current)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [hasNextPage, loading, onLoadMore, threshold, rootMargin])

  return <div ref={loaderRef} style={{ height: '50px' }} />
}

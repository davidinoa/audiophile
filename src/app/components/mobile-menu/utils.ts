export function getLandmarkElements() {
  const body = document.querySelector('body')!
  const main = document.querySelector('main')!
  const footer = document.querySelector('footer')!
  return [body, main, footer] as const
}

export function disableContentInteraction() {
  const [body, main, footer] = getLandmarkElements()
  body.style.overflow = 'hidden'
  main.setAttribute('inert', 'true')
  footer.setAttribute('inert', 'true')
}

export function enableContentInteraction() {
  const [body, main, footer] = getLandmarkElements()
  body.style.overflow = 'auto'
  main.removeAttribute('inert')
  footer.removeAttribute('inert')
}

const exitAnimationClasses = ['animate-out', 'fade-out']

export function toggleExitAnimationClasses({
  isOpen,
  elementRefs,
}: {
  isOpen: boolean
  elementRefs: Array<React.RefObject<HTMLElement> | null>
}) {
  elementRefs.forEach((elementRef) =>
    isOpen
      ? elementRef?.current?.classList.add(...exitAnimationClasses)
      : elementRef?.current?.classList.remove(...exitAnimationClasses),
  )
}

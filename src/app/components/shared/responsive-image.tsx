/* eslint-disable jsx-a11y/alt-text */
import {
  unstable_getImgProps as getImgProps,
  type ImageProps,
  type StaticImageData,
} from 'next/image'
import { type ExternalImageData } from '~/lib/types'

type Props = {
  desktopImg: StaticImageData | ExternalImageData
  tabletImg: StaticImageData | ExternalImageData
  mobileImg: StaticImageData | ExternalImageData
  commonImgProps: Omit<ImageProps, 'src'>
} & React.ComponentProps<'picture'>

export default function ResponsiveImage({
  className,
  desktopImg,
  tabletImg,
  mobileImg,
  commonImgProps,
}: Props) {
  function getImageProps(src: StaticImageData) {
    return getImgProps({ ...commonImgProps, src })
  }

  return (
    <picture className={className}>
      <source
        media="(min-width: 64rem)"
        srcSet={getImageProps(desktopImg).props.srcSet}
      />
      <source
        media="(min-width: 48rem)"
        srcSet={getImageProps(tabletImg).props.srcSet}
      />
      <img {...getImageProps(mobileImg).props} />
    </picture>
  )
}

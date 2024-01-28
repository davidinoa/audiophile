import {
  unstable_getImgProps as getImgProps,
  type ImageProps,
  type StaticImageData,
} from 'next/image'
import { type ExternalImageData } from '~/lib/types'

type ImageData = StaticImageData | ExternalImageData

type Props = {
  desktopImg: ImageData
  tabletImg: ImageData
  mobileImg: ImageData
  commonImgProps: Omit<ImageProps, 'src'>
} & React.ComponentProps<'picture'>

export default function ResponsiveImage({
  className,
  desktopImg,
  tabletImg,
  mobileImg,
  commonImgProps,
}: Props) {
  function getImageProps(src: ImageData) {
    return getImgProps({ ...commonImgProps, src })
  }

  const desktopProps = getImageProps(desktopImg).props
  const tabletProps = getImageProps(tabletImg).props

  return (
    <picture className={className}>
      <source
        media="(min-width: 64rem)"
        srcSet={desktopProps.srcSet}
        width={desktopProps.width}
        height={desktopProps.height}
      />
      <source
        media="(min-width: 48rem)"
        srcSet={tabletProps.srcSet}
        width={tabletProps.width}
        height={tabletProps.height}
      />
      <img {...getImageProps(mobileImg).props} alt={commonImgProps.alt} />
    </picture>
  )
}

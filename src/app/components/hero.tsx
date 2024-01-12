import {
  StaticImageData,
  unstable_getImgProps as getImgProps,
} from 'next/image'
import desktopImage from '~/assets/images/desktop/hero.jpg'
import mobileImage from '~/assets/images/mobile/hero.jpg'
import tabletImage from '~/assets/images/tablet/hero.jpg'
import Button from './shared/button'

function getImageProps(src: StaticImageData) {
  return getImgProps({
    src,
    fill: true,
    sizes: '100vw',
    placeholder: 'blur',
    alt: 'XX99 Mark II headphones',
    className: 'object-cover object-bottom opacity-50',
  }).props
}

export default function Hero() {
  return (
    <section className="grid-container | relative m-auto h-[32rem] grid-rows-1 bg-black p-6 md:h-[40rem] md:p-10">
      <div className="relative z-10 m-auto grid h-full max-w-[22rem] content-center justify-items-center gap-6 text-center md:max-w-[24.75rem] lg:m-0 lg:justify-items-start lg:text-left">
        <div className="grid gap-4 md:gap-6">
          <p className="-mr-[10px] text-sm uppercase leading-snug tracking-[10px] opacity-50">
            New Product
          </p>
          <h2 className="text-4xl font-bold uppercase leading-[1.1] tracking-[1.285px] md:text-[3.5rem] md:tracking-[2px]">
            XX99 Mark II headphones
          </h2>
        </div>
        <p className="text-sm-plus font-medium leading-relaxed opacity-75 md:max-w-[21.875rem]">
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast
        </p>
        <Button href="/headphones/xx99-mark-ii" className="md:mt-4">
          See Product
        </Button>
      </div>
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet={getImageProps(desktopImage).srcSet}
        />
        <source
          media="(min-width: 768px)"
          srcSet={getImageProps(tabletImage).srcSet}
        />
        <img {...getImageProps(mobileImage)} />
      </picture>
    </section>
  )
}

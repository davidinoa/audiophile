import Image from 'next/image'
import circlesPattern from '~/assets/pattern-circles.svg?url'
import { BREAKPOINTS, CLOUDINARY_BASE_URL } from '~/lib/constants'
import type { ResponsiveImageData } from '~/lib/types'
import Button from './shared/button'
import ResponsiveImage from './shared/responsive-image'

const zx7ImageSizes = {
  desktop: { width: 1110, height: 320 },
  tablet: { width: 689, height: 320 },
  mobile: { width: 654, height: 640 },
}

const yx1ImageSizes = {
  desktop: { width: 540, height: 320 },
  tablet: { width: 678, height: 640 },
  mobile: { width: 654, height: 400 },
}

const zx7ImageData = BREAKPOINTS.reduce((acc, breakpoint) => {
  acc[breakpoint] = {
    ...zx7ImageSizes[breakpoint],
    src: `${CLOUDINARY_BASE_URL}/home/${breakpoint}/featured-zx7-${breakpoint}`,
  }
  return acc
}, {} as ResponsiveImageData)

const yx1ImageData = BREAKPOINTS.reduce((acc, breakpoint) => {
  acc[breakpoint] = {
    ...yx1ImageSizes[breakpoint],
    src: `${CLOUDINARY_BASE_URL}/home/${breakpoint}/featured-yx1-${breakpoint}`,
  }
  return acc
}, {} as ResponsiveImageData)

export default function FeaturedSection() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <h2 className="sr-only">Featured Section</h2>
      <div
        className="grid justify-items-center gap-10 overflow-hidden rounded-lg bg-copper-canyon bg-cover bg-no-repeat px-6 py-14 text-center text-white md:col-span-2 md:gap-16 md:px-16 lg:grid-cols-2 lg:gap-36 lg:py-0"
        style={{
          backgroundImage: `url(${circlesPattern.src})`,
          backgroundPosition: '50% -125px',
          backgroundSize: 'cover',
        }}
      >
        <Image
          src="https://res.cloudinary.com/dhm0lpxko/image/upload/v1707177952/home/desktop/featured-zx9-desktop.png"
          alt="ZX9 speaker"
          width={756}
          height={918}
          className="w-[10rem] md:w-[12.375rem] lg:-mb-4 lg:w-[23rem] lg:place-self-end "
        />
        <div className="grid max-w-[21.5rem] justify-items-center gap-6 lg:justify-items-start lg:place-self-start lg:py-32 lg:text-left">
          <h3 className="text-4xl font-bold uppercase leading-[1.1] tracking-[2px] md:text-[3.5rem] md:leading-none lg:px-0">
            ZX9
            <br /> Speaker
          </h3>
          <p className="text-sm-plus leading-relaxed text-white/75">
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          <Button variant="secondaryInverted" href="/speakers/zx9">
            See Product
          </Button>
        </div>
      </div>
      <div className="relative h-[20rem] overflow-hidden rounded-lg md:col-span-2">
        <ResponsiveImage
          desktopImg={zx7ImageData.desktop}
          tabletImg={zx7ImageData.tablet}
          mobileImg={zx7ImageData.mobile}
          commonImgProps={{
            fill: true,
            quality: 100,
            alt: 'ZX7 speaker',
            className: 'object-cover',
          }}
        />
        <div className="relative z-10 grid h-full content-center gap-8 px-6 md:px-16">
          <h3 className="text-[1.75rem] font-bold uppercase leading-snug tracking-[2px]">
            ZX7 Speaker
          </h3>
          <Button variant="secondary" href="/speakers/zxy">
            See Product
          </Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg">
        <ResponsiveImage
          desktopImg={yx1ImageData.desktop}
          tabletImg={yx1ImageData.tablet}
          mobileImg={yx1ImageData.mobile}
          commonImgProps={{
            quality: 100,
            alt: 'YX1 earphones',
            className: 'object-cover h-[12.5rem] md:h-[20rem] w-full',
          }}
        />
      </div>
      <div className="grid h-[12.5rem] content-center gap-8 rounded-lg bg-frost-whisper px-6 md:h-[20rem] md:px-10">
        <h3 className="text-[1.75rem] font-bold uppercase leading-snug tracking-[2px]">
          YX1 Earphones
        </h3>
        <Button variant="secondary" href="/earphones/yx1">
          See Product
        </Button>
      </div>
    </section>
  )
}

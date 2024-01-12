import desktopImage from '~/assets/images/desktop/about-section.jpg'
import mobileImage from '~/assets/images/mobile/about-section.jpg'
import tabletImage from '~/assets/images/tablet/about-section.jpg'
import ResponsiveImage from './responsive-image'

export default function AboutSection() {
  return (
    <section className="content-grid justify-items-center gap-y-8 pb-[7.5rem] pt-8">
      <div className="grid w-full grid-flow-dense place-items-center gap-10 md:gap-16 lg:grid-cols-[27.8125rem_minmax(0,1fr)] lg:gap-32">
        <ResponsiveImage
          className="w-full lg:col-start-2"
          desktopImg={desktopImage}
          tabletImg={tabletImage}
          mobileImg={mobileImage}
          commonImgProps={{
            alt: 'man listening to music on headphones',
            className:
              'rounded-lg max-md:max-h-[20.4375rem] md:min-h-[18.75rem] w-full lg:max-h-[36.75rem] object-cover',
          }}
        />
        <div className="grid max-w-[28rem] gap-8 text-center md:max-w-[35.8125rem] lg:text-left">
          <h2 className="text-[1.75rem] font-bold uppercase leading-snug tracking-[1px] md:text-[2.5rem] md:leading-[1.1]">
            Bringing you the <span className="text-copper-canyon">best</span>{' '}
            audio gear
          </h2>
          <p className="text-sm-plus font-medium leading-relaxed text-black/50">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
    </section>
  )
}

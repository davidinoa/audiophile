import Image from 'next/image'
import RightArrowIcon from '~/assets/svgs/icon-arrow-right.svg'
import { type ExternalImageData } from '~/lib/types'
import Link from './shared/link'

type Props = {
  name: string
  thumbnail: ExternalImageData
}

export default function CategoryCard({ name, thumbnail }: Props) {
  return (
    <Link
      href={`/${name}`}
      variant="wrapper"
      className="group grid justify-items-center"
      style={{
        gridTemplateRows: '3.25rem auto 1fr',
      }}
    >
      <Image
        src={thumbnail}
        alt="headphones category thumbnail"
        className="z-10 col-start-1 row-span-2 row-start-1 h-[150px] w-auto"
      />
      <div className="col-start-1 row-span-2 row-start-2 grid h-[10.3125rem] w-full place-items-center content-end gap-4 rounded-lg bg-frost-whisper pb-5 pt-20">
        <h3 className="tracking-[1px]text-sm-plus font-bold uppercase leading-snug tracking-[1px]">
          {name}
        </h3>
        <button
          type="button"
          tabIndex={-1}
          className="flex items-center gap-2 text-[0.8125rem] font-bold uppercase leading-none tracking-[1px] text-black/50 hover:text-copper-canyon group-hover:text-copper-canyon"
        >
          Shop <RightArrowIcon />
        </button>
      </div>
    </Link>
  )
}

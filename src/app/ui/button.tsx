/* eslint-disable import/no-extraneous-dependencies */
import { Button as NextUIButton } from '@nextui-org/button'

type Props = React.ComponentProps<typeof NextUIButton>
export default function Button({ children }: Props) {
  return <NextUIButton>{children}</NextUIButton>
}

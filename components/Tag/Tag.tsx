import { PropsWithChildren } from "react"
import { tagStyle } from './Tag.css'
type TagProps = PropsWithChildren<{
  variant?: 'green' | 'gray'
}>

export function Tag(props: TagProps) {
  return (
    <span className={tagStyle}>{props.children}</span>
  )
}
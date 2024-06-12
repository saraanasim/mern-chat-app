import { HeadingSizes } from '@/utils/constants'
import { mergeClasses } from '@/utils/helpers'
import React from 'react'

type Props = {
    text: string,
    variant?: HeadingSizes
}

const Heading = ({ text, variant = HeadingSizes.LG }: Props) => {
    return (
        <p className={mergeClasses('font-bold', variant === HeadingSizes.LG ? 'text-3xl' : 'text-2xl')}>{text}</p>
    )
}

export { Heading }
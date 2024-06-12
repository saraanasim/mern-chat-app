import React from 'react'
type Props = {
    active: boolean
}
export const Indicator = ({ active }: Props) => {
    if (active) return <div className='size-[7px] bg-green-500 rounded-full border-gray-500'></div>
    return <div className='size-[7px] bg-red-500 rounded-full border-gray-500'></div>
}

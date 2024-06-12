import React from 'react'

type Props = {
    errors?: string[]
}

const ErrorText = ({ errors }: Props) => {
    if(!errors?.length) return null
    return (
        <div className='flex flex-col'>
            {errors.map((each)=>(<p className='text-red-500'>{each}</p>))}
        </div>
    )
}

export { ErrorText }
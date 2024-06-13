'use client'
import { onLogout } from '@/lib/actions'
import { useAppSelector } from '@/redux/hooks'
import { selectActiveUser } from '@/redux/selectors/activeUser.selectors'

export const Header = () => {
    const activeUser = useAppSelector(selectActiveUser)

    return (
        <div className="w-full h-16 bg-green-500/20 text-2xl flex items-center justify-between px-4">
            <div className="flex-grow text-center">
                Welcome <span className="font-bold">{activeUser.name}</span>
            </div>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={()=>onLogout()}
            >
                Logout
            </button>
        </div>
    )
}
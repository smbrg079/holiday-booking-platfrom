'use client'

import { updateBookingStatus } from "@/app/actions/admin"
import { CheckCircle2, Clock, XCircle, Loader2 } from "lucide-react"
import { useState, useTransition } from "react"

interface Props {
    id: string
    status: string
}

export default function BookingStatusToggle({ id, status }: Props) {
    const [isPending, startTransition] = useTransition()
    const [currentStatus, setCurrentStatus] = useState(status)

    const handleUpdate = (newStatus: string) => {
        // Optimistic update
        setCurrentStatus(newStatus)

        startTransition(async () => {
            const result = await updateBookingStatus(id, newStatus)
            if (result.error) {
                // Revert on error
                setCurrentStatus(status)
                alert(result.error)
            }
        })
    }

    if (isPending) {
        return <Loader2 size={16} className="animate-spin text-indigo-600" />
    }

    return (
        <div className="flex items-center space-x-2">
            {currentStatus === 'CONFIRMED' && (
                <div className="flex items-center text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold cursor-pointer" onClick={() => handleUpdate('CANCELLED')}>
                    <CheckCircle2 size={14} className="mr-1" /> Confirmed
                </div>
            )}
            {currentStatus === 'PENDING' && (
                <div className="flex items-center text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-xs font-bold cursor-pointer" onClick={() => handleUpdate('CONFIRMED')}>
                    <Clock size={14} className="mr-1" /> Pending
                </div>
            )}
            {currentStatus === 'CANCELLED' && (
                <div className="flex items-center text-rose-600 bg-rose-50 px-3 py-1 rounded-full text-xs font-bold cursor-pointer" onClick={() => handleUpdate('PENDING')}>
                    <XCircle size={14} className="mr-1" /> Cancelled
                </div>
            )}
        </div>
    )
}

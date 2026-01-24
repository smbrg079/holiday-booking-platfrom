'use client'

import React, { useState } from 'react'
import { submitReview } from '@/app/actions/reviews'
import { Star, Send, CheckCircle2 } from 'lucide-react'

interface ReviewFormProps {
    activityId: string
}

export default function ReviewForm({ activityId }: ReviewFormProps) {
    const [rating, setRating] = useState(5)
    const [hover, setHover] = useState(0)
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData()
        formData.append('activityId', activityId)
        formData.append('rating', rating.toString())
        formData.append('comment', comment)

        const result = await submitReview(formData)
        setIsSubmitting(false)

        if (result?.error) {
            alert(result.error)
        } else {
            setSuccess(true)
            setComment('')
        }
    }

    if (success) {
        return (
            <div className="bg-emerald-50 p-8 rounded-[2rem] text-center border border-emerald-100 animate-in fade-in zoom-in duration-500">
                <CheckCircle2 className="mx-auto text-emerald-500 mb-4" size={48} />
                <h4 className="text-xl font-bold text-slate-900 mb-2">Review Submitted!</h4>
                <p className="text-slate-600">Thank you for sharing your experience with our community.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Leave a Review</h3>
            <p className="text-slate-500 text-sm mb-6">How was your experience? Your feedback helps other travelers.</p>

            <div>
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Rating</label>
                <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            className="focus:outline-none transition-transform hover:scale-125 duration-200"
                        >
                            <Star
                                size={32}
                                className={`transition-colors ${(hover || rating) >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Your Experience</label>
                <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="What did you love about this activity?"
                    rows={4}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-slate-600 font-medium placeholder:text-slate-400"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={isSubmitting || comment.length < 5}
                className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center space-x-3 disabled:opacity-50"
            >
                {isSubmitting ? (
                    <span>Submitting...</span>
                ) : (
                    <>
                        <span>Post Review</span>
                        <Send size={18} />
                    </>
                )}
            </button>
        </form>
    )
}

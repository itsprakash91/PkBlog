import Comment from '@/components/Comment'
import CommentCount from '@/components/CommentCount'
import CommentList from '@/components/CommentList'
import LikeCount from '@/components/LikeCount'
import Loading from '@/components/Loading'
import RelatedBlog from '@/components/RelatedBlog'
import { Avatar } from '@/components/ui/avatar'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import { AvatarImage } from '@radix-ui/react-avatar'
import { decode } from 'entities'
import moment from 'moment'
import React from 'react'
import { useParams } from 'react-router-dom'

const SingleBlogDetails = () => {
    const { blog, category } = useParams()

    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-blog/${blog}`, {
        method: 'get',
        credentials: 'include',
    }, [blog, category])

    if (loading) return <Loading />
    return (

        <div className='md:flex-nowrap flex-wrap flex justify-between gap-20'>
            {data && data.blog &&
                <>
                    <div className='border border-border/60 rounded-2xl bg-card/80 md:w-[70%] w-full p-8 shadow-sm backdrop-blur-sm'>
                        <h1 className='text-3xl md:text-4xl font-semibold mb-6 leading-tight tracking-tight'>{data.blog.title}</h1>
                        <div className='flex justify-between items-center'>
                            <div className='flex justify-between items-center gap-5'>
                                <Avatar>
                                    <AvatarImage src={data.blog.author.avatar} />
                                </Avatar>
                                <div>
                                    <p className='font-bold'>{data.blog.author.name}</p>
                                    <p>Date: {moment(data.blog.createdAt).format('DD-MM-YYYY')}</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center gap-5'>
                                <LikeCount props={{ blogid: data.blog._id }} />
                                <CommentCount props={{ blogid: data.blog._id }} />
                            </div>
                        </div>
                        <div className='my-6 -mx-2 md:mx-0 overflow-hidden rounded-xl'>
                            <img src={data.blog.featuredImage} className='w-full object-cover aspect-video' alt={data.blog.title} />
                        </div>
                        <div className="prose-content" dangerouslySetInnerHTML={{ __html: decode(data.blog.blogContent) || '' }}>

                        </div>

                        <div className='border-t border-border mt-5 pt-5'>
                            <Comment props={{ blogid: data.blog._id }} />
                        </div>


                    </div>
                </>

            }
            <div className='border border-border/60 rounded-2xl bg-card/80 md:w-[30%] w-full p-6 shadow-sm backdrop-blur-sm sticky top-24'>
                <RelatedBlog props={{ category: category, currentBlog: blog }} />
            </div>
        </div>
    )
}

export default SingleBlogDetails
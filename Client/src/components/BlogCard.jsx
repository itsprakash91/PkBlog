import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from "@/components/ui/badge"
import { useSelector } from 'react-redux'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { FaRegCalendarAlt } from "react-icons/fa";
import usericon from '@/assets/images/user.png'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/helpers/RouteName'
const BlogCard = ({ props }) => {

    return (
        <Link to={RouteBlogDetails(props.category.slug, props.slug)} className="block group">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 border-border/40">
                <div className="relative overflow-hidden">
                    <img src={props.featuredImage} className="w-full object-cover aspect-[16/10] transition-transform duration-500 group-hover:scale-105" alt={props.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-5">
                    <div className='flex items-center justify-between gap-2 mb-3'>
                        <div className='flex items-center gap-2 min-w-0'>
                            <Avatar className="size-8 ring-2 ring-background">
                                <AvatarImage src={props.author.avatar || usericon} />
                            </Avatar>
                            <span className='text-sm font-medium truncate'>{props.author.name}</span>
                        </div>
                        {props.author.role === 'admin' && (
                            <Badge variant="secondary" className="shrink-0 text-xs">Admin</Badge>
                        )}
                    </div>
                    <h2 className='text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-2'>{props.title}</h2>
                    <p className='flex items-center gap-2 text-xs text-muted-foreground'>
                        <FaRegCalendarAlt className="size-3.5" />
                        {moment(props.createdAt).format('MMM D, YYYY')}
                    </p>
                </CardContent>
            </Card>
        </Link>
    )
}

export default BlogCard
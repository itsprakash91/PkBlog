import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from './ui/input'
import { RouteSearch } from '@/helpers/RouteName'

const SearchBox = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) {
      navigate(RouteSearch(trimmed))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Input
        type="search"
        placeholder="Search articles or categories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-10 rounded-full bg-muted/50 border-border/60 pl-5 focus-visible:ring-primary/50 transition-all w-full"
      />
    </form>
  )
}

export default SearchBox
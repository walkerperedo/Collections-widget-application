import React from 'react'
import './sortDropdown.css'
import { SelectDropdown } from '../UI/Select'

interface SortDropdownProps {
  value: string
  onChange: (value: string) => void
}

const sortOptions = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value)
  }
  return <SelectDropdown id="sort" label="Sort by:" value={value} onChange={handleChange} options={sortOptions} layout="horizontal" />
}

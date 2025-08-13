import React from 'react'
import './Select.css'

export interface SelectOption {
  value: string
  label: string
}

interface SelectDropdownProps {
  id: string
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  options: SelectOption[]
  layout?: 'vertical' | 'horizontal'
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({ id, label, value, onChange, options, layout = 'vertical' }) => {
  const containerClassName = `select-container ${layout}`

  return (
    <div className={containerClassName}>
      <label htmlFor={id}>{label}</label>
      <select id={id} name={id} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

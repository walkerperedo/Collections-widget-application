import React from 'react'
import './FilterPanel.css'
import type { ActiveFilters, ProductFilter } from '../../types/shopify'

interface FilterPanelProps {
  filters: ProductFilter[]
  setActiveFilters: React.Dispatch<React.SetStateAction<ActiveFilters[]>>
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setActiveFilters }) => {
  const NO_VALUE_SUFFIX = '-novalue'

  const onFilterChange = (filterValue: string) => {
    const isNoValue = filterValue.endsWith(NO_VALUE_SUFFIX)
    const rawJson = isNoValue ? filterValue.slice(0, -NO_VALUE_SUFFIX.length) : filterValue
    const parsed = JSON.parse(rawJson) as Record<string, string | undefined>
    const filterKey = Object.keys(parsed)[0]

    setActiveFilters((prev) =>
      prev.map((filter) => {
        const currentKey = Object.keys(filter)[0]
        if (currentKey === filterKey) {
          return { [filterKey]: isNoValue ? undefined : parsed[filterKey] }
        }
        return filter
      })
    )
  }
  return (
    <aside className="filter-panel">
      {filters.map((filter) => (
        <div key={filter.id} className="filter-group">
          <label htmlFor={`${filter.id}-filter`}>{filter.label}</label>
          <select
            id={`${filter.id}-filter`}
            defaultValue={`${filter.values[0].input}${NO_VALUE_SUFFIX}`}
            onChange={(e) => {
              onFilterChange(e.target.value)
            }}
          >
            <option value={`${filter.values[0].input}${NO_VALUE_SUFFIX}`}>No option selected</option>
            {filter.values.map((valueFilter) => (
              <option key={valueFilter.input} value={valueFilter.input}>
                {valueFilter.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </aside>
  )
}

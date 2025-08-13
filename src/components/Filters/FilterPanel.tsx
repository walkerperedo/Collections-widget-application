import React, { useState } from 'react'
import './FilterPanel.css'
import type { ActiveFilters, ProductFilter } from '../../types/shopify'

interface FilterPanelProps {
  filters: ProductFilter[]
  setActiveFilters: React.Dispatch<React.SetStateAction<ActiveFilters[]>>
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setActiveFilters }) => {
  const NO_VALUE_SUFFIX = '-novalue'
  const [filtersOpen, setFiltersOpen] = useState(false)

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
    setFiltersOpen(false)
  }
  return (
    <>
      <button className="filters-toggle" onClick={() => setFiltersOpen(true)}>
        Filters
      </button>
      <div className={`filter-overlay ${filtersOpen ? 'active' : ''}`} onClick={() => setFiltersOpen(false)}>
        <aside className="filter-panel" onClick={(e) => e.stopPropagation()}>
          <button className="filter-close" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
            &times;
          </button>
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
      </div>
    </>
  )
}

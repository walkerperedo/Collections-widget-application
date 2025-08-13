import React from "react";
import "./sortDropdown.css";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="sort-dropdown">
      <label htmlFor="sort">Sort by:</label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};
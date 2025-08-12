import React from 'react';
import './SkeletonLoader.module.css';

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = '300px',
  className = ''
}) => {
  return (
    <div
      className={`skeleton-loader ${className}`}
      style={{
        width,
        height,
        backgroundColor: '#e0e0e0',
        borderRadius: '8px',
        animation: 'pulse 1.5s infinite ease-in-out'
      }}
    />
  );
};
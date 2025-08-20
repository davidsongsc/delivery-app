import React from 'react';

interface SkeletonProps {
  count?: number;
  className?: string;
  height?: string | number;
  width?: string | number;
  circle?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  count = 1,
  className = '',
  height = '1rem',
  width = '100%',
  circle = false,
}) => {
  const skeletons = Array.from({ length: count });

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 animate-pulse rounded ${circle ? 'rounded-full' : ''} ${className}`}
          style={{
            height: typeof height === 'number' ? `${height}px` : height,
            width: typeof width === 'number' ? `${width}px` : width,
          }}
        />
      ))}
    </>
  );
};

export default Skeleton;
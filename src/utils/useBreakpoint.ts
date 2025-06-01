import { useEffect, useState, useCallback } from 'react';

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

const getBreakpoint = (width: number): Breakpoint => {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    typeof window !== 'undefined' ? getBreakpoint(window.innerWidth) : 'desktop'
  );

  const handleResize = useCallback(() => {
    setBreakpoint(getBreakpoint(window.innerWidth));
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return breakpoint;
}

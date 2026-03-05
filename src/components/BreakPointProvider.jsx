import { createContext, use, useMemo } from 'react';
import { useMediaQuery } from '@mui/material';

export const BreakpointContext = createContext({});
const BreakpointsProvider = ({ children }) => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only('xs'));
  const isSm = useMediaQuery((theme) => theme.breakpoints.only('sm'));
  const isMd = useMediaQuery((theme) => theme.breakpoints.only('md'));
  const isLg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

  const currentBreakpoint = useMemo(() => {
    if (isLg) return 'lg';
    if (isMd) return 'md';
    if (isSm) return 'sm';
    if (isXs) return 'xs';
    return 'xl';
  }, [isXs, isSm, isMd, isLg]);

  const order = ['xs', 'sm', 'md', 'lg', 'xl'];
  const getIndex = (key) => order.indexOf(key);
  const currentIndex = getIndex(currentBreakpoint);

  const up = (key) => currentIndex >= getIndex(key);
  const down = (key) => currentIndex <= getIndex(key);
  const only = (key) => currentBreakpoint === key;
  const between = (start, end) => {
    const startIndex = getIndex(start);
    const endIndex = getIndex(end);
    return currentIndex >= startIndex && currentIndex <= endIndex;
  };

  return (
    <BreakpointContext value={{ currentBreakpoint, up, down, only, between }}>
      {children}
    </BreakpointContext>
  );
};
export const useBreakpoints = () => use(BreakpointContext);
export default BreakpointsProvider;

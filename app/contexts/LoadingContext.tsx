"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Loading } from '../components/Loading';

interface LoadingContextType {
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  // 路由变化时只在第一次显示加载状态
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        if (mounted) {
          setIsLoading(false);
        }
      }, 500); // 减少加载时间以提升用户体验

      return () => {
        mounted = false;
        clearTimeout(timer);
      };
    }
  }, [pathname]);

  const showLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {isLoading && <Loading pathname={pathname} />}
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
} 
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { performanceMonitor } from '@/utils/performanceMonitor';

interface PerformanceConfig {
  enableMemoryMonitoring?: boolean;
  enableRenderTracking?: boolean;
  enableNetworkMonitoring?: boolean;
  debounceDelay?: number;
}

export function useOptimizedPerformance(
  componentName: string,
  config: PerformanceConfig = {}
) {
  const {
    enableMemoryMonitoring = true,
    enableRenderTracking = true,
    enableNetworkMonitoring = false,
    debounceDelay = 300
  } = config;

  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(performance.now());
  // Fix: Use proper type for setTimeout
  const debounceTimeoutRef = useRef<number | null>(null);

  // Compteur de rendus
  useEffect(() => {
    if (enableRenderTracking) {
      renderCountRef.current += 1;
      const now = performance.now();
      const renderTime = now - lastRenderTimeRef.current;
      
      performanceMonitor.recordMetric(
        `${componentName}_render`,
        renderTime,
        'rendering'
      );
      
      lastRenderTimeRef.current = now;
    }
  });

  // Monitoring mémoire
  const checkMemoryUsage = useCallback(() => {
    if (enableMemoryMonitoring && 'memory' in performance) {
      const memory = (performance as any).memory;
      performanceMonitor.recordMetric(
        `${componentName}_memory_used`,
        memory.usedJSHeapSize,
        'memory'
      );
    }
  }, [componentName, enableMemoryMonitoring]);

  // Debounced action handler with proper cleanup
  const debouncedAction = useCallback((action: () => void) => {
    // Fix: Clear existing timeout properly
    if (debounceTimeoutRef.current !== null) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = window.setTimeout(() => {
      const startTime = performance.now();
      action();
      const endTime = performance.now();
      
      performanceMonitor.recordMetric(
        `${componentName}_action`,
        endTime - startTime,
        'interaction'
      );
      // Fix: Reset ref after execution
      debounceTimeoutRef.current = null;
    }, debounceDelay);
  }, [componentName, debounceDelay]);

  // Métriques de performance
  const performanceMetrics = useMemo(() => ({
    renderCount: renderCountRef.current,
    lastRenderTime: lastRenderTimeRef.current,
    componentName
  }), [componentName]);

  // Fix: Proper cleanup with comprehensive timeout clearing
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current !== null) {
        clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = null;
      }
    };
  }, []);

  return {
    performanceMetrics,
    checkMemoryUsage,
    debouncedAction,
    recordCustomMetric: (name: string, value: number, type: 'memory' | 'rendering' | 'network' | 'interaction' = 'interaction') => {
      performanceMonitor.recordMetric(`${componentName}_${name}`, value, type);
    }
  };
}
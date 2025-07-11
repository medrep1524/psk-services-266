
/**
 * Moniteur de performance pour optimiser l'application
 */

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  category: 'navigation' | 'interaction' | 'resource' | 'custom';
}

interface PerformanceReport {
  vitals: {
    loadComplete?: number;
    firstContentfulPaint?: number;
    largestContentfulPaint?: number;
    firstInputDelay?: number;
    cumulativeLayoutShift?: number;
    memoryUsage?: {
      used: number;
      total: number;
      limit: number;
    };
    recentMetrics?: PerformanceMetric[];
  };
  slowOperations?: Array<{
    operation: string;
    duration: number;
    timestamp: number;
  }>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private slowOperations: Array<{ operation: string; duration: number; timestamp: number }> = [];
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
    this.trackWebVitals();
  }

  private initializeObservers() {
    // Observer pour les métriques de navigation
    if ('PerformanceObserver' in window) {
      const navigationObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.addMetric({
            name: entry.name,
            value: entry.duration || 0,
            timestamp: Date.now(),
            category: 'navigation'
          });
        });
      });

      try {
        navigationObserver.observe({ entryTypes: ['navigation', 'measure', 'mark'] });
        this.observers.push(navigationObserver);
      } catch (error) {
        console.warn('Navigation observer not supported:', error);
      }

      // Observer pour les ressources
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 1000) { // Ressources lentes > 1s
            this.slowOperations.push({
              operation: `Resource: ${entry.name}`,
              duration: entry.duration,
              timestamp: Date.now()
            });
          }
        });
      });

      try {
        resourceObserver.observe({ entryTypes: ['resource'] });
        this.observers.push(resourceObserver);
      } catch (error) {
        console.warn('Resource observer not supported:', error);
      }
    }
  }

  private trackWebVitals() {
    // Import dynamique des web-vitals si disponible
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS((metric) => this.addMetric({
        name: 'CLS',
        value: metric.value,
        timestamp: Date.now(),
        category: 'custom'
      }));

      getFID((metric) => this.addMetric({
        name: 'FID',
        value: metric.value,
        timestamp: Date.now(),
        category: 'custom'
      }));

      getFCP((metric) => this.addMetric({
        name: 'FCP',
        value: metric.value,
        timestamp: Date.now(),
        category: 'custom'
      }));

      getLCP((metric) => this.addMetric({
        name: 'LCP',
        value: metric.value,
        timestamp: Date.now(),
        category: 'custom'
      }));

      getTTFB((metric) => this.addMetric({
        name: 'TTFB',
        value: metric.value,
        timestamp: Date.now(),
        category: 'custom'
      }));
    }).catch(() => {
      console.warn('Web Vitals library not available');
    });
  }

  addMetric(metric: PerformanceMetric) {
    this.metrics.push(metric);
    // Garder seulement les 100 dernières métriques
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }
  }

  measureOperation<T>(name: string, operation: () => T): T {
    const start = performance.now();
    const result = operation();
    const duration = performance.now() - start;

    this.addMetric({
      name,
      value: duration,
      timestamp: Date.now(),
      category: 'custom'
    });

    if (duration > 16) { // Opérations lentes > 16ms (frame budget)
      this.slowOperations.push({
        operation: name,
        duration,
        timestamp: Date.now()
      });
    }

    return result;
  }

  async measureAsyncOperation<T>(name: string, operation: () => Promise<T>): Promise<T> {
    const start = performance.now();
    const result = await operation();
    const duration = performance.now() - start;

    this.addMetric({
      name,
      value: duration,
      timestamp: Date.now(),
      category: 'custom'
    });

    if (duration > 100) { // Opérations async lentes > 100ms
      this.slowOperations.push({
        operation: name,
        duration,
        timestamp: Date.now()
      });
    }

    return result;
  }

  getPerformanceReport(): PerformanceReport {
    const memoryInfo = (performance as any).memory;
    
    return {
      vitals: {
        loadComplete: performance.now(),
        memoryUsage: memoryInfo ? {
          used: memoryInfo.usedJSHeapSize,
          total: memoryInfo.totalJSHeapSize,
          limit: memoryInfo.jsHeapSizeLimit
        } : undefined,
        recentMetrics: this.metrics.slice(-20) // 20 dernières métriques
      },
      slowOperations: this.slowOperations.slice(-10) // 10 dernières opérations lentes
    };
  }

  clearMetrics() {
    this.metrics = [];
    this.slowOperations = [];
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Hook React pour utiliser le monitoring de performance
import { useEffect, useCallback } from 'react';

export function usePerformanceTracking(componentName: string) {
  const trackOperation = useCallback(
    async <T>(operationName: string, operation: () => Promise<T> | T): Promise<T> => {
      return performanceMonitor.measureAsyncOperation(`${componentName}_${operationName}`, operation);
    },
    [componentName]
  );

  useEffect(() => {
    performanceMonitor.addMetric({
      name: `component_mount_${componentName}`,
      value: performance.now(),
      timestamp: Date.now(),
      category: 'custom'
    });
    
    return () => {
      performanceMonitor.addMetric({
        name: `component_unmount_${componentName}`,
        value: performance.now(),
        timestamp: Date.now(),
        category: 'custom'
      });
    };
  }, [componentName]);

  return { trackOperation };
}

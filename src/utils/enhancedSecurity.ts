
/**
 * Module de sécurité renforcée - Consolidation et réexportation
 */

// Réexportation depuis les modules existants
export * from './unifiedSecurity';
export * from './optimizedSecurity';

// Imports pour la consolidation
import { unifiedValidation, securityMonitor as unifiedMonitor } from './unifiedSecurity';
import { secureValidation, lightSecurityMonitor } from './optimizedSecurity';

// Alias pour compatibilité
export const securityMonitor = {
  ...unifiedMonitor,
  ...lightSecurityMonitor,
  
  // Méthodes consolidées
  validateInput: (input: string, context: string = 'general') => {
    return unifiedMonitor.validateInput(input, context);
  },
  
  logSecurityEvent: (type: string, details: any, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium') => {
    unifiedMonitor.logSecurityEvent(type, details, severity);
  },
  
  getSecurityReport: () => {
    return unifiedMonitor.getSecurityReport();
  }
};

// Validateur renforcé pour la compatibilité
export const enhancedValidator = {
  validate: (type: string, value: any) => {
    switch (type) {
      case 'string':
        return secureValidation.validate(secureValidation.schemas.searchInput, value);
      case 'email':
        return secureValidation.validate(secureValidation.schemas.email, value);
      case 'url':
        return secureValidation.validate(secureValidation.schemas.url, value);
      case 'fileName':
        return secureValidation.validate(secureValidation.schemas.fileName, value);
      case 'id':
        return secureValidation.validate(secureValidation.schemas.id, value);
      default:
        return secureValidation.validate(secureValidation.schemas.searchInput, value);
    }
  },
  
  validateObject: (schema: Record<string, string>, data: Record<string, any>, context?: string) => {
    const results: Record<string, any> = {};
    let isValid = true;
    
    for (const [field, rule] of Object.entries(schema)) {
      const value = data[field];
      const validation = secureValidation.validate(secureValidation.schemas.searchInput, value);
      results[field] = validation;
      if (!validation.success) {
        isValid = false;
      }
    }
    
    return {
      isValid,
      results,
      summary: {
        total: Object.keys(schema).length,
        passed: Object.values(results).filter((r: any) => r.success).length,
        failed: Object.values(results).filter((r: any) => !r.success).length
      }
    };
  }
};

// Validation enrichie avec toutes les méthodes nécessaires
export const enhancedValidation = {
  ...unifiedValidation,
  ...secureValidation,
  
  // Méthodes de validation spécialisées
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  phone: (phone: string): boolean => {
    const phoneRegex = /^(\+213|0)[5-7][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },
  
  strongPassword: (password: string): { valid: boolean; score: number; feedback: string[] } => {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) score += 25;
    else feedback.push('Au moins 8 caractères requis');

    if (/[a-z]/.test(password)) score += 25;
    else feedback.push('Lettres minuscules requises');

    if (/[A-Z]/.test(password)) score += 25;
    else feedback.push('Lettres majuscules requises');

    if (/[0-9]/.test(password)) score += 25;
    else feedback.push('Chiffres requis');

    return { valid: score === 100, score, feedback };
  }
};

interface SecurityEvent {
  type: string;
  details: any;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: number;
  userAgent?: string;
  ip?: string;
}

interface SecurityReport {
  total: number;
  last24h: number;
  severity: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  recentEvents: SecurityEvent[];
}

class SecurityMonitor {
  private events: SecurityEvent[] = [];
  private readonly MAX_EVENTS = 1000;

  constructor() {
    this.initializeSecurityHeaders();
    this.monitorConsoleAccess();
    this.monitorDevTools();
  }

  private initializeSecurityHeaders() {
    // Vérifier les headers de sécurité recommandés
    const securityHeaders = [
      'X-Content-Type-Options',
      'X-Frame-Options',
      'X-XSS-Protection',
      'Strict-Transport-Security',
      'Content-Security-Policy'
    ];

    // Cette vérification est indicative - les headers sont gérés côté serveur
    if (process.env.NODE_ENV === 'development') {
      console.info('Security headers should be configured on the server:', securityHeaders);
    }
  }

  private monitorConsoleAccess() {
    const originalConsole = { ...console };
    
    // Surveiller l'utilisation excessive de la console
    let consoleUsage = 0;
    const resetUsage = () => { consoleUsage = 0; };
    
    ['log', 'warn', 'error', 'debug'].forEach(method => {
      (console as any)[method] = (...args: any[]) => {
        consoleUsage++;
        if (consoleUsage > 50) { // Seuil de détection
          this.logSecurityEvent('excessive_console_usage', {
            method,
            count: consoleUsage
          }, 'medium');
        }
        return (originalConsole as any)[method](...args);
      };
    });

    // Reset du compteur toutes les minutes
    setInterval(resetUsage, 60000);
  }

  private monitorDevTools() {
    // Détection d'ouverture des DevTools (approximative)
    let devtools = false;
    const threshold = 160;

    const checkDevTools = () => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools) {
          devtools = true;
          this.logSecurityEvent('devtools_opened', {
            windowDimensions: {
              outer: { width: window.outerWidth, height: window.outerHeight },
              inner: { width: window.innerWidth, height: window.innerHeight }
            }
          }, 'low');
        }
      } else {
        devtools = false;
      }
    };

    setInterval(checkDevTools, 1000);
  }

  logSecurityEvent(type: string, details: any, severity: SecurityEvent['severity']) {
    const event: SecurityEvent = {
      type,
      details,
      severity,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      ip: 'client-side' // L'IP réelle doit être obtenue côté serveur
    };

    this.events.push(event);

    // Limiter le nombre d'événements stockés
    if (this.events.length > this.MAX_EVENTS) {
      this.events = this.events.slice(-this.MAX_EVENTS);
    }

    // Log critique vers le serveur
    if (severity === 'critical' || severity === 'high') {
      this.reportToServer(event);
    }

    // Log local pour debug
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Security Event [${severity.toUpperCase()}]:`, type, details);
    }
  }

  private async reportToServer(event: SecurityEvent) {
    try {
      // Ici vous pouvez envoyer l'événement à votre API de sécurité
      const response = await fetch('/api/security/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        console.error('Failed to report security event to server');
      }
    } catch (error) {
      console.error('Error reporting security event:', error);
    }
  }

  // Validation XSS basique
  validateInput(input: string): boolean {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    ];

    for (const pattern of xssPatterns) {
      if (pattern.test(input)) {
        this.logSecurityEvent('xss_attempt', {
          input: input.substring(0, 100), // Limiter la taille du log
          pattern: pattern.toString()
        }, 'high');
        return false;
      }
    }

    return true;
  }

  // Sanitisation basique
  sanitizeInput(input: string): string {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  // Validation des URLs
  validateUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      const allowedProtocols = ['http:', 'https:'];
      const allowedDomains = [
        window.location.hostname,
        'api.supabase.co',
        // Ajouter d'autres domaines autorisés
      ];

      if (!allowedProtocols.includes(urlObj.protocol)) {
        this.logSecurityEvent('invalid_protocol', {
          url: url.substring(0, 100),
          protocol: urlObj.protocol
        }, 'medium');
        return false;
      }

      if (!allowedDomains.some(domain => urlObj.hostname.endsWith(domain))) {
        this.logSecurityEvent('unauthorized_domain', {
          url: url.substring(0, 100),
          hostname: urlObj.hostname
        }, 'medium');
        return false;
      }

      return true;
    } catch (error) {
      this.logSecurityEvent('malformed_url', {
        url: url.substring(0, 100),
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 'medium');
      return false;
    }
  }

  getSecurityReport(): SecurityReport {
    const now = Date.now();
    const last24h = this.events.filter(event => 
      now - event.timestamp < 24 * 60 * 60 * 1000
    );

    const severity = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0
    };

    last24h.forEach(event => {
      severity[event.severity]++;
    });

    return {
      total: this.events.length,
      last24h: last24h.length,
      severity,
      recentEvents: this.events.slice(-10)
    };
  }

  clearEvents() {
    this.events = [];
  }
}

export const securityMonitor = new SecurityMonitor();

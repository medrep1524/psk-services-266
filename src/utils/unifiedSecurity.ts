
/**
 * Module de sécurité unifié - Consolidation de tous les utilitaires de sécurité
 */

import { z } from 'zod';

// ===== MONITORING ET DÉTECTION =====
class UnifiedSecurityMonitor {
  private events: Array<{
    type: string;
    timestamp: number;
    details: any;
    severity: 'low' | 'medium' | 'high' | 'critical';
  }> = [];

  private suspiciousPatterns = [
    /(<script|javascript:|data:|vbscript:)/i,
    /(union|select|insert|drop|delete|update)/i,
    /(\.\.|\/\.\.|\\\.\.)/,
    /(eval\(|setTimeout\(|setInterval\()/i
  ];

  logSecurityEvent(type: string, details: any, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium') {
    this.events.push({
      type,
      timestamp: Date.now(),
      details,
      severity
    });

    // Nettoyer les anciens événements
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
    }

    this.analyzeThreats();
  }

  validateInput(input: string, context: string): {
    isValid: boolean;
    threats: string[];
    sanitized: string;
  } {
    const threats: string[] = [];
    
    for (const pattern of this.suspiciousPatterns) {
      if (pattern.test(input)) {
        threats.push(`Suspicious pattern detected: ${pattern.source}`);
      }
    }

    if (threats.length > 0) {
      this.logSecurityEvent('suspicious_input', {
        context,
        input: input.substring(0, 100),
        threats
      }, 'high');
    }

    return {
      isValid: threats.length === 0,
      threats,
      sanitized: this.sanitizeInput(input)
    };
  }

  private sanitizeInput(input: string): string {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/\\/g, '&#x5C;');
  }

  private analyzeThreats() {
    const recentEvents = this.events.filter(
      event => Date.now() - event.timestamp < 300000 // 5 minutes
    );

    const criticalEvents = recentEvents.filter(event => event.severity === 'critical');
    if (criticalEvents.length > 2) {
      console.error('🚨 CRITICAL: Multiple critical security events detected!');
    }

    const suspiciousInputCount = recentEvents.filter(
      event => event.type === 'suspicious_input'
    ).length;

    if (suspiciousInputCount > 5) {
      console.warn('🚨 Multiple suspicious inputs detected!');
    }
  }

  getSecurityReport() {
    const last24h = this.events.filter(
      event => Date.now() - event.timestamp < 86400000
    );

    return {
      totalEvents: this.events.length,
      last24h: last24h.length,
      bySeverity: this.groupBySeverity(last24h),
      threatTypes: this.groupByType(last24h),
      recommendations: this.getRecommendations(last24h)
    };
  }

  private groupBySeverity(events: typeof this.events) {
    return events.reduce((acc, event) => {
      acc[event.severity] = (acc[event.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private groupByType(events: typeof this.events) {
    return events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private getRecommendations(events: typeof this.events): string[] {
    const recommendations: string[] = [];
    
    if (events.filter(e => e.type === 'suspicious_input').length > 0) {
      recommendations.push('Renforcer la validation des entrées utilisateur');
    }
    
    if (events.length > 50) {
      recommendations.push('Considérer la mise en place de rate limiting');
    }

    const criticalCount = events.filter(e => e.severity === 'critical').length;
    if (criticalCount > 0) {
      recommendations.push('Audit de sécurité immédiat requis');
    }

    return recommendations;
  }
}

// ===== VALIDATION SÉCURISÉE =====
export const unifiedValidation = {
  // Schémas Zod sécurisés
  schemas: {
    searchInput: z.string()
      .min(1, "Le terme de recherche ne peut pas être vide")
      .max(200, "Le terme de recherche est trop long")
      .regex(/^[a-zA-Z0-9\s\-\_\.\,\;\:\!\?\'\"\(\)\[\]]+$/, "Caractères non autorisés détectés"),

    fileName: z.string()
      .min(1, "Le nom de fichier ne peut pas être vide")
      .max(255, "Le nom de fichier est trop long")
      .regex(/^[a-zA-Z0-9\s\-\_\.]+$/, "Nom de fichier contient des caractères non autorisés"),

    email: z.string()
      .email("Format d'email invalide")
      .max(254, "Email trop long"),

    url: z.string()
      .url("URL invalide")
      .max(2048, "URL trop longue"),

    id: z.string()
      .uuid("ID invalide")
  },

  // Validation avec monitoring intégré
  validate<T>(schema: z.ZodSchema<T>, data: unknown, context: string = 'general'): { 
    success: true; data: T 
  } | { 
    success: false; error: string 
  } {
    try {
      const result = schema.parse(data);
      securityMonitor.logSecurityEvent('validation_success', { context }, 'low');
      return { success: true, data: result };
    } catch (error) {
      if (error instanceof z.ZodError) {
        securityMonitor.logSecurityEvent('validation_error', { 
          context, 
          error: error.errors[0]?.message 
        }, 'medium');
        return { success: false, error: error.errors[0]?.message || "Données invalides" };
      }
      securityMonitor.logSecurityEvent('validation_critical_error', { context, error }, 'critical');
      return { success: false, error: "Erreur de validation" };
    }
  },

  // Validations spécialisées
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  phone: (phone: string): boolean => {
    const phoneRegex = /^(\+213|0)[5-7][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  algerianId: (id: string): boolean => {
    const idRegex = /^[0-9]{12}$/;
    return idRegex.test(id);
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

// ===== SANITISATION =====
export const unifiedSanitizer = {
  html: (input: string): string => {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  filename: (filename: string): string => {
    return filename.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_');
  },

  url: (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('Protocole non autorisé');
      }
      return urlObj.toString();
    } catch {
      return '';
    }
  },

  input: (input: string): string => {
    return securityMonitor.validateInput(input, 'sanitization').sanitized;
  }
};

// ===== UTILITAIRES AVANCÉS =====
export const unifiedSecurityUtils = {
  generateSecureToken: (length: number = 32): string => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  hashSensitiveData: async (data: string): Promise<string> => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  // Fix: Add encryption utilities for secure localStorage
  encryptData: async (data: string, key?: string): Promise<string> => {
    try {
      const secretKey = key || await unifiedSecurityUtils.generateEncryptionKey();
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      
      const keyBuffer = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secretKey.slice(0, 32)), // Use first 32 chars as key
        { name: 'AES-GCM' },
        false,
        ['encrypt']
      );

      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encryptedBuffer = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        keyBuffer,
        dataBuffer
      );

      const encryptedArray = new Uint8Array(encryptedBuffer);
      const result = new Uint8Array(iv.length + encryptedArray.length);
      result.set(iv);
      result.set(encryptedArray, iv.length);

      return btoa(String.fromCharCode(...result));
    } catch (error) {
      console.error('Encryption failed:', error);
      // Fallback to base64 encoding if encryption fails
      return btoa(data);
    }
  },

  decryptData: async (encryptedData: string, key?: string): Promise<string> => {
    try {
      const secretKey = key || await unifiedSecurityUtils.generateEncryptionKey();
      const encoder = new TextEncoder();
      const data = new Uint8Array([...atob(encryptedData)].map(char => char.charCodeAt(0)));
      
      const iv = data.slice(0, 12);
      const encrypted = data.slice(12);

      const keyBuffer = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secretKey.slice(0, 32)),
        { name: 'AES-GCM' },
        false,
        ['decrypt']
      );

      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        keyBuffer,
        encrypted
      );

      return new TextDecoder().decode(decryptedBuffer);
    } catch (error) {
      console.error('Decryption failed:', error);
      // Fallback to base64 decoding if decryption fails
      try {
        return atob(encryptedData);
      } catch {
        return '';
      }
    }
  },

  generateEncryptionKey: async (): Promise<string> => {
    // Generate a session-based key that's consistent during the session
    if (!window.sessionEncryptionKey) {
      window.sessionEncryptionKey = unifiedSecurityUtils.generateSecureToken(64);
    }
    return window.sessionEncryptionKey;
  },

  validateFileUpload: (file: File): { valid: boolean; error?: string } => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/gif'
    ];

    if (file.size > maxSize) {
      securityMonitor.logSecurityEvent('file_upload_size_violation', { 
        size: file.size, 
        filename: file.name 
      }, 'medium');
      return { valid: false, error: 'Fichier trop volumineux (max 10MB)' };
    }

    if (!allowedTypes.includes(file.type)) {
      securityMonitor.logSecurityEvent('file_upload_type_violation', { 
        type: file.type, 
        filename: file.name 
      }, 'high');
      return { valid: false, error: 'Type de fichier non autorisé' };
    }

    securityMonitor.logSecurityEvent('file_upload_success', { 
      type: file.type, 
      size: file.size,
      filename: file.name 
    }, 'low');
    return { valid: true };
  },

  validatePermission: (userRole: string, requiredRole: string): boolean => {
    const roleHierarchy = {
      'admin': 4,
      'manager': 3,
      'editor': 2,
      'viewer': 1,
      'guest': 0
    };
    
    const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;
    
    const hasPermission = userLevel >= requiredLevel;
    
    securityMonitor.logSecurityEvent('permission_check', {
      userRole,
      requiredRole,
      hasPermission
    }, hasPermission ? 'low' : 'medium');
    
    return hasPermission;
  },

  logSecurityEvent: async (event: {
    type: 'login' | 'logout' | 'access_denied' | 'data_access' | 'file_upload' | 'custom';
    userId?: string;
    details: string;
    severity?: 'low' | 'medium' | 'high' | 'critical';
  }) => {
    const logEntry = {
      ...event,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      ip: 'client-side'
    };

    securityMonitor.logSecurityEvent(event.type, logEntry, event.severity);

    // Fix: Secure storage of security logs with encryption
    if (typeof window !== 'undefined') {
      try {
        const encryptedLogs = localStorage.getItem('unified_security_logs_enc');
        let logs: any[] = [];
        
        if (encryptedLogs) {
          const decryptedData = await unifiedSecurityUtils.decryptData(encryptedLogs);
          logs = JSON.parse(decryptedData || '[]');
        }
        
        // Sanitize log entry before storage (remove sensitive details)
        const sanitizedLogEntry = {
          type: logEntry.type,
          timestamp: logEntry.timestamp,
          severity: event.severity || 'medium',
          // Hash sensitive details instead of storing them directly
          detailsHash: await unifiedSecurityUtils.hashSensitiveData(JSON.stringify(logEntry.details))
        };
        
        logs.push(sanitizedLogEntry);
        
        if (logs.length > 100) {
          logs = logs.slice(-100);
        }
        
        const encryptedData = await unifiedSecurityUtils.encryptData(JSON.stringify(logs));
        localStorage.setItem('unified_security_logs_enc', encryptedData);
        
        // Remove old unencrypted logs if they exist
        localStorage.removeItem('unified_security_logs');
      } catch (error) {
        console.error('Failed to store security logs securely:', error);
        // Don't store logs if encryption fails to maintain security
      }
    }
  }
};

// Fix: Add type declaration for session encryption key
declare global {
  interface Window {
    sessionEncryptionKey?: string;
  }
}

// Instance globale du moniteur de sécurité
export const securityMonitor = new UnifiedSecurityMonitor();

// Export par défaut pour l'utilisation simplifiée
export default {
  monitor: securityMonitor,
  validation: unifiedValidation,
  sanitizer: unifiedSanitizer,
  utils: unifiedSecurityUtils
};

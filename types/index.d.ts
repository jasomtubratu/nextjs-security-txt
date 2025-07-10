export interface SecurityTxtConfig {
  /** Contact information for security researchers (required) */
  contact: string | string[];
  
  /** Expiration date in ISO 8601 format (recommended) */
  expires?: string;
  
  /** URL or email for encrypted communication */
  encryption?: string | string[];
  
  /** URL to a page recognizing security researchers */
  acknowledgments?: string;
  
  /** Preferred languages for communication */
  preferredLanguages?: string | string[];
  
  /** Canonical URL for the security.txt file */
  canonical?: string;
  
  /** URL to security policy */
  policy?: string;
  
  /** URL to security-related job postings */
  hiring?: string;
  
  /** Custom fields */
  customFields?: Record<string, string | string[]>;
}

export interface NextConfig {
  [key: string]: any;
}

/**
 * Next.js plugin for security.txt
 */
export function withSecurityTxt(securityConfig: SecurityTxtConfig): (nextConfig?: NextConfig) => NextConfig;

/**
 * API route handler for security.txt
 */
export function createSecurityTxtHandler(config: SecurityTxtConfig): (req: any, res: any) => void;

/**
 * Generate security.txt content from configuration
 */
export function generateSecurityTxt(config: SecurityTxtConfig): string;

/**
 * CLI command to generate security.txt files
 */
export function generateCommand(config: SecurityTxtConfig): void;
export interface SecurityTxtConfig {
  contact: string | string[];
  expires?: string;
  encryption?: string | string[];
  acknowledgments?: string;
  preferredLanguages?: string | string[];
  canonical?: string;
  policy?: string;
  hiring?: string;
  disableRootSecurityTxt?: boolean;
  customFields?: Record<string, string | string[]>;
}

export interface NextConfig {
  [key: string]: any;
}

export function withSecurityTxt(securityConfig: SecurityTxtConfig): (nextConfig?: NextConfig) => NextConfig;

export function createSecurityTxtHandler(config: SecurityTxtConfig): (req: any, res: any) => void;

export function generateSecurityTxt(config: SecurityTxtConfig): string;

export function generateCommand(config: SecurityTxtConfig): void;

export namespace Presets {
  export interface Basic {
    contact: string;
    expires: string;
  }
  
  export interface Standard extends Basic {
    encryption?: string;
    acknowledgments?: string;
    policy?: string;
  }
  
  export interface Enterprise extends Standard {
    preferredLanguages?: string[];
    canonical?: string;
    hiring?: string;
    disableRootSecurityTxt?: boolean;
  }
}

export namespace Validation {
  export function validateConfig(config: SecurityTxtConfig): {
    valid: boolean;
    errors: string[];
    warnings: string[];
  };
  
  export function isValidContact(contact: string): boolean;
  
  export function isValidExpires(expires: string): boolean;
}
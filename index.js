const fs = require('fs');
const path = require('path');

/**
 * Generate security.txt content from configuration
 * @param {Object} config - Security.txt configuration
 * @returns {string} - Formatted security.txt content
 */
function generateSecurityTxt(config) {
  const lines = [];
  
  if (config.contact) {
    if (Array.isArray(config.contact)) {
      config.contact.forEach(contact => {
        lines.push(`Contact: ${contact}`);
      });
    } else {
      lines.push(`Contact: ${config.contact}`);
    }
  }
  
  if (config.expires) {
    lines.push(`Expires: ${config.expires}`);
  }
  
  if (config.encryption) {
    if (Array.isArray(config.encryption)) {
      config.encryption.forEach(encryption => {
        lines.push(`Encryption: ${encryption}`);
      });
    } else {
      lines.push(`Encryption: ${config.encryption}`);
    }
  }
  
  if (config.acknowledgments) {
    lines.push(`Acknowledgments: ${config.acknowledgments}`);
  }
  
  if (config.preferredLanguages) {
    if (Array.isArray(config.preferredLanguages)) {
      lines.push(`Preferred-Languages: ${config.preferredLanguages.join(', ')}`);
    } else {
      lines.push(`Preferred-Languages: ${config.preferredLanguages}`);
    }
  }
  
  if (config.canonical) {
    lines.push(`Canonical: ${config.canonical}`);
  }
  
  if (config.policy) {
    lines.push(`Policy: ${config.policy}`);
  }
  
  if (config.hiring) {
    lines.push(`Hiring: ${config.hiring}`);
  }
  
  if (config.customFields) {
    Object.entries(config.customFields).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => {
          lines.push(`${key}: ${v}`);
        });
      } else {
        lines.push(`${key}: ${value}`);
      }
    });
  }
  
  return lines.join('\n') + '\n';
}

/**
 * Create security.txt files in the public directory
 * @param {Object} config - Security.txt configuration
 */
function createSecurityTxtFiles(config) {
  const content = generateSecurityTxt(config);
  const publicDir = path.join(process.cwd(), 'public');
  const wellKnownDir = path.join(publicDir, '.well-known');
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  if (!fs.existsSync(wellKnownDir)) {
    fs.mkdirSync(wellKnownDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(wellKnownDir, 'security.txt'), content);
  fs.writeFileSync(path.join(publicDir, 'security.txt'), content);
  
  console.log('✅ Security.txt files created successfully!');
  console.log('   - /.well-known/security.txt');
  console.log('   - /security.txt');
}

/**
 * Next.js plugin for security.txt
 * @param {Object} securityConfig - Security.txt configuration
 * @returns {function} - Next.js config function
 */
function withSecurityTxt(securityConfig = {}) {
  return function(nextConfig = {}) {
    if (!securityConfig.contact) {
      throw new Error('Security.txt requires at least one contact field');
    }
    
    if (!securityConfig.expires) {
      console.warn('⚠️  Security.txt should include an expires field (RFC 9116 recommendation)');
    }
    
    createSecurityTxtFiles(securityConfig);
    
    return {
      ...nextConfig,
      async rewrites() {
        const rewrites = await (nextConfig.rewrites?.() || []);
        return Array.isArray(rewrites) ? rewrites : {
          beforeFiles: rewrites.beforeFiles || [],
          afterFiles: rewrites.afterFiles || [],
          fallback: rewrites.fallback || []
        };
      }
    };
  };
}

/**
 * API route handler for security.txt
 * @param {Object} config - Security.txt configuration
 * @returns {function} - API route handler
 */
function createSecurityTxtHandler(config) {
  return function handler(req, res) {
    const content = generateSecurityTxt(config);
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(content);
  };
}

/**
 * CLI command to generate security.txt
 * @param {Object} config - Security.txt configuration
 */
function generateCommand(config) {
  createSecurityTxtFiles(config);
}

module.exports = {
  withSecurityTxt,
  createSecurityTxtHandler,
  generateSecurityTxt,
  generateCommand
};
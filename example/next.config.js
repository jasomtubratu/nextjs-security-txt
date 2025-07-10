const { withSecurityTxt } = require('nextjs-security-txt');

const securityTxtConfig = {
  contact: [
    'mailto:security@example.com',
    'https://example.com/security-contact'
  ],
  expires: '2024-12-31T23:59:59Z',
  encryption: 'https://example.com/pgp-key.txt',
  acknowledgments: 'https://example.com/security-acknowledgments',
  preferredLanguages: ['en', 'es'],
  canonical: 'https://example.com/.well-known/security.txt',
  policy: 'https://example.com/responsible-disclosure',
  hiring: 'https://example.com/careers/security'
};

module.exports = withSecurityTxt(securityTxtConfig)({
  // Your existing Next.js config
  reactStrictMode: true, // not required but recommended
  experimental: { // Enable app directory support, if needed
    appDir: true
  }
});
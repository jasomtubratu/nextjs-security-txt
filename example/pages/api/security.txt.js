const { createSecurityTxtHandler } = require('nextjs-security-txt');

const securityConfig = {
  contact: [
    'mailto:security@example.com',
    'https://example.com/security-contact'
  ],
  expires: '2024-12-31T23:59:59Z',
  encryption: 'https://example.com/pgp-key.txt',
  acknowledgments: 'https://example.com/hall-of-fame',
  policy: 'https://example.com/responsible-disclosure'
};

export default createSecurityTxtHandler(securityConfig);
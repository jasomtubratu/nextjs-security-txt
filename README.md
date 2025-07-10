# nextjs-security-txt

Add security.txt support to Next.js applications following RFC 9116 standard.

## Installation

```bash
npm install nextjs-security-txt
```

## TypeScript Support

This package includes TypeScript definitions for type safety and autocompletion support.

```typescript
import { SecurityTxtConfig, withSecurityTxt } from 'nextjs-security-txt';

const securityConfig: SecurityTxtConfig = {
  contact: 'mailto:security@example.com',
  expires: '2024-12-31T23:59:59Z',
};
```

## Usage

### Method 1: Using Next.js Config (Recommended)

Create or update your `next.config.js`:

```javascript
const { withSecurityTxt } = require('nextjs-security-txt');

const securityTxtConfig = {
  contact: 'mailto:security@example.com',
  expires: '2024-12-31T23:59:59Z',
  encryption: 'https://example.com/pgp-key.txt',
  acknowledgments: 'https://example.com/security-acknowledgments',
  preferredLanguages: ['en', 'es'],
  canonical: 'https://example.com/.well-known/security.txt',
  policy: 'https://example.com/security-policy'
};

module.exports = withSecurityTxt(securityTxtConfig)({
  // Your existing Next.js config
});
```

### Method 2: Using API Routes

Create `pages/api/security.txt.js` (or `app/api/security.txt/route.js` for App Router):

```javascript
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
```

For App Router (`app/api/security.txt/route.js`):

```javascript
import { createSecurityTxtHandler } from 'nextjs-security-txt';

const securityConfig = {
  contact: 'mailto:security@example.com',
  expires: '2024-12-31T23:59:59Z'
};

const handler = createSecurityTxtHandler(securityConfig);

export async function GET(request) {
  const res = {
    setHeader: (key, value) => {},
    status: (code) => ({ send: (content) => new Response(content, { status: code }) }),
    send: (content) => new Response(content)
  };
  
  return handler(request, res);
}
```

### Method 3: Manual Generation

```javascript
const { generateCommand } = require('nextjs-security-txt');

const config = {
  contact: 'mailto:security@example.com',
  expires: '2024-12-31T23:59:59Z'
};

generateCommand(config);
```

## Configuration

### Required Fields

- `contact`: Email address or URL for security researchers to report vulnerabilities

### Recommended Fields

- `expires`: Expiration date in ISO 8601 format
- `encryption`: URL to PGP key or encryption information
- `acknowledgments`: URL to a page recognizing security researchers
- `policy`: URL to security policy or responsible disclosure policy

### Optional Fields

- `preferredLanguages`: Array of preferred languages for communication
- `canonical`: Canonical URL for the security.txt file
- `hiring`: URL to security-related job postings
- `disableRootSecurityTxt`: Boolean to disable creation of `/security.txt` (only creates `/.well-known/security.txt`)
- `customFields`: Object containing custom fields

## Examples

### Basic Configuration

```javascript
const securityTxtConfig = {
  contact: 'mailto:security@example.com',
  expires: '2024-12-31T23:59:59Z'
};
```

### Only .well-known/security.txt (RFC 9116 Standard Only)

```javascript
const securityTxtConfig = {
  contact: 'mailto:security@example.com',
  expires: '2024-12-31T23:59:59Z',
  disableRootSecurityTxt: true
};
```

### Advanced Configuration

```javascript
const securityTxtConfig = {
  contact: [
    'mailto:security@example.com',
    'https://example.com/security-contact'
  ],
  expires: '2024-12-31T23:59:59Z',
  encryption: [
    'https://example.com/pgp-key.txt',
    'openpgp4fpr:1234567890ABCDEF1234567890ABCDEF12345678'
  ],
  acknowledgments: 'https://example.com/security-acknowledgments',
  preferredLanguages: ['en', 'es', 'fr'],
  canonical: 'https://example.com/.well-known/security.txt',
  policy: 'https://example.com/responsible-disclosure',
  hiring: 'https://example.com/careers/security',
  disableRootSecurityTxt: false, // Default: creates both files
  customFields: {
    'Bug-Bounty': 'https://example.com/bug-bounty',
    'Disclosure-Timeline': '90 days'
  }
};
```

## File Locations

By default, the package creates security.txt files at:

- `/.well-known/security.txt` (RFC 9116 standard location)
- `/security.txt` (fallback location)

To only create the RFC 9116 standard location and disable the fallback, set `disableRootSecurityTxt: true` in your configuration.
## Validation

The package validates your configuration:

- Ensures required `contact` field is present
- Warns if `expires` field is missing (recommended by RFC 9116)
- Generates properly formatted security.txt content

## RFC 9116 Compliance

This package follows the RFC 9116 standard for security.txt files, including:

- Proper field formatting
- Support for multiple contact methods
- Expiration date handling
- Canonical URL specification
- Digital signature support (through custom fields)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Security

If you discover a security vulnerability in this package, please send an email to help@tomascards.eu.
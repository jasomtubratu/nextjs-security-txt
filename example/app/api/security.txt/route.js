import { createSecurityTxtHandler } from 'nextjs-security-txt';

const securityConfig = {
  contact: 'mailto:security@example.com',
  expires: '2024-12-31T23:59:59Z',
  encryption: 'https://example.com/pgp-key.txt',
  policy: 'https://example.com/responsible-disclosure'
};

const handler = createSecurityTxtHandler(securityConfig);

export async function GET(request) {
  let responseContent = '';
  let statusCode = 200;
  const headers = new Headers();
  
  const mockRes = {
    setHeader: (key, value) => headers.set(key, value),
    status: (code) => {
      statusCode = code;
      return {
        send: (content) => {
          responseContent = content;
          return new Response(content, { 
            status: statusCode, 
            headers: headers 
          });
        }
      };
    },
    send: (content) => {
      responseContent = content;
      return new Response(content, { 
        status: statusCode, 
        headers: headers 
      });
    }
  };
  
  const result = handler(request, mockRes);
  
  return new Response(responseContent, { 
    status: statusCode, 
    headers: headers 
  });
}
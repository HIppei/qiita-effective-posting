const cspHeaders = `
          default-src 'self';
          script-src 'self' 'unsafe-eval' 'unsafe-inline';
          style-src 'self' 'unsafe-inline';
          connect-src ws: ${process.env.NEXT_PUBLIC_QIITA_API_ENDPOINT};`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeaders.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    async rewrites() {
        return [
          {
            source: '/ovyvbslprmns',
            destination: '/auth/oauth2callback', // The :path parameter isn't used here so will be automatically passed in the query
          },
          {
            source: '/gmailauth',
            destination: '/auth/gmailauth', // The :path parameter isn't used here so will be automatically passed in the query
          }
        ]
      },
}

module.exports = nextConfig

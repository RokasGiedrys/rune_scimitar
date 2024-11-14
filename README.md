 <h1>Old School RuneScape Blog</h1>
  <p>A personal blog built with <strong>Next.js 15</strong> where I share updates, tips, and guides about the game <strong>Old School RuneScape</strong> (OSRS). This project leverages modern web technologies for a fast, responsive, and SEO-friendly experience.</p>

  <h2>Features</h2>
  <ul>
    <li><strong>Markdown Support:</strong> Write and edit posts easily with markdown.</li>
    <li><strong>Image Optimisation:</strong> Sanity-powered image handling for fast load times.</li>
    <li><strong>User Authentication:</strong> Set up with NextAuth.js for secure access.</li>
    <li><strong>Responsive Design:</strong> Styled with Tailwind CSS for mobile-friendly layouts.</li>
    <li><strong>Error Monitoring:</strong> Sentry integration to track errors in production.</li>
  </ul>

  <h2>Tech Stack</h2>
  <ul>
    <li><strong>Next.js 15</strong></li>
    <li><strong>React 19</strong></li>
    <li><strong>Sanity CMS</strong> for content management</li>
    <li><strong>NextAuth.js</strong> for authentication</li>
    <li><strong>Tailwind CSS</strong> for styling</li>
    <li><strong>Sentry</strong> for error tracking</li>
  </ul>

  <h2>Getting Started</h2>

  <h3>Prerequisites</h3>
  <ul>
    <li><strong>Node.js:</strong> Version 16 or higher</li>
    <li><strong>Sanity CLI:</strong> For managing content</li>
  </ul>

  <h3>Installation</h3>
  <ol>
    <li><strong>Clone the repository:</strong>
      <pre><code>git clone https://github.com/yourusername/osrs-blog.git
cd osrs-blog
      </code></pre>
    </li>
    <li><strong>Install dependencies:</strong>
      <pre><code>npm install</code></pre>
    </li>
    <li><strong>Configure environment variables:</strong> Create a <code>.env.local</code> file in the root of the project with the following:
      <pre><code>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
SANITY_PROJECT_ID=your-sanity-project-id
SANITY_DATASET=production
SENTRY_DSN=your-sentry-dsn (optional)
      </code></pre>
    </li>
    <li><strong>Run the development server:</strong>
      <pre><code>npm run dev</code></pre>
    </li>
    <li><strong>Open your browser:</strong> Go to <a href="http://localhost:3000">http://localhost:3000</a> to view the site.</li>
  </ol>

  <h2>Usage</h2>
  <p>All content is managed in <strong>Sanity CMS</strong>. Simply log in to your Sanity dashboard to add, update, or remove posts.</p>

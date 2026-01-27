const fs = require('fs');
const path = require('path');

const vercelConfig = {
    routes: [
        {
            src: "/assets/(.*)",
            dest: "/assets/$1"
        },
        {
            src: "/(.*)\\.ttf",
            dest: "/$1.ttf"
        },
        {
            src: "/(.*)\\.otf",
            dest: "/$1.otf"
        },
        {
            src: "/(.*)",
            dest: "/index.html"
        }
    ],
    headers: [
        {
            source: "/assets/(.*)",
            headers: [
                {
                    key: "Cache-Control",
                    value: "public, max-age=31536000, immutable"
                }
            ]
        }
    ]
};

const distPath = path.join(__dirname, '../dist');
fs.writeFileSync(
    path.join(distPath, 'vercel.json'),
    JSON.stringify(vercelConfig, null, 2)
);

console.log('✅ vercel.json created in dist folder');

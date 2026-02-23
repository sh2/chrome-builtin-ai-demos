const fs = require('fs');
const https = require('https');
const path = require('path');

const fetchUrl = (url) => new Promise((resolve, reject) => {
    https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
    }).on('error', reject);
});

async function buildChat() {
    const html = fs.readFileSync(path.join(__dirname, 'chat/index.html'), 'utf8');
    const css = fs.readFileSync(path.join(__dirname, 'chat/style.css'), 'utf8');
    const js = fs.readFileSync(path.join(__dirname, 'chat/script.js'), 'utf8');

    console.log('Fetching marked...');
    const markedJs = await fetchUrl('https://cdn.jsdelivr.net/npm/marked/marked.min.js');

    console.log('Fetching dompurify...');
    const domPurifyJs = await fetchUrl('https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js');

    let out = html.replace('<link rel="stylesheet" href="style.css">', `<style>\n${css}\n  </style>`);

    out = out.replace('<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>', `<script>\n${markedJs}\n  </script>`);
    out = out.replace('<script src="https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js"></script>', `<script>\n${domPurifyJs}\n  </script>`);
    out = out.replace('<script src="script.js"></script>', `<script>\n${js}\n  </script>`);

    fs.writeFileSync(path.join(__dirname, 'dist/chat.html'), out);
    console.log('Done compiling dist/chat.html');
}

async function buildTranslator() {
    const html = fs.readFileSync(path.join(__dirname, 'translator/index.html'), 'utf8');
    const css = fs.readFileSync(path.join(__dirname, 'translator/style.css'), 'utf8');
    const js = fs.readFileSync(path.join(__dirname, 'translator/script.js'), 'utf8');

    let out = html.replace('<link rel="stylesheet" href="style.css">', `<style>\n${css}\n  </style>`);
    out = out.replace('<script src="script.js"></script>', `<script>\n${js}\n  </script>`);

    fs.writeFileSync(path.join(__dirname, 'dist/translator.html'), out);
    console.log('Done compiling dist/translator.html');
}

async function build() {
    await buildChat();
    await buildTranslator();
}

build().catch(console.error);

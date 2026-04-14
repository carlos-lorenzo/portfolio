import fs from 'fs';
import { fileURLToPath } from 'url';
const content = fs.readFileSync('src/content/blog/why-snns.mdx', 'utf-8');
const wordCount = content.split(/\s+/).length;
console.log(wordCount);

import fs from 'fs';
import path from 'path';

const african_head = fs.readFileSync(path.join(__dirname, 'african_head.txt'), 'utf8');
export {
    african_head
};
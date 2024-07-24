// middlewares/multerConfig.js
import multer, { diskStorage } from 'multer';
import { join, extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Ensure the temp directory exists
const tempDir = join(__dirname, 'temp');
if (!existsSync(tempDir)) {
  mkdirSync(tempDir, { recursive: true });
}

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir); // Use the temp directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

export default {upload};

import multer from 'multer';
import { join, extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure the temp directory exists
const tempDir = join(__dirname, 'temp');
if (!existsSync(tempDir)) {
  mkdirSync(tempDir, { recursive: true });
}

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir); // Use the temp directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + extname(file.originalname)); // Unique filename
  },
});

// Create the multer upload instance
const upload = multer({ storage: storage });

export { upload };

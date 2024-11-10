import fs from 'fs';
import path from 'path';
import { IncomingMessage } from 'http';
import {defineEventHandler, sendError } from 'h3';
import formidable from 'formidable';

const uploadDir = path.join(process.cwd(), 'public/uploads');

const parseForm = (event) => {
    return new Promise((resolve,reject) => {
        const form = new formidable.IncomingForm();
        form.uploadDir = uploadDir;
        form.keepExtensions = true;

        form.parse(event.req, (err, fields, files) => {
            if (err) {
                reject(err);
            } else {
                resolve({ fields, files });
            }
        });
    });
};

export default defineEventHandler(async (event) => {
    try {
        const { files } = await parseForm(event);

        const file = files.file && Array.isArray(files.file) ? files.file[0]: files.file;

        if (!file) {
            return sendError(event, { statusCode: 400, message: 'No file uploaded' });
        }

        const uploadPath = path.join(uploadDir, file.originalFilename);

        // 移动文件到目标位置
        await fs.promises.rename(file.filepath, uploadPath);

        // 返回文件的URL给前端
        const imageUrl = `/uploads/${file.originalFilename}`;
        return { imageUrl };
    } catch (error) {
        return sendError(event, { statusCode: 500, message: 'Failed to save file' });
    }
});


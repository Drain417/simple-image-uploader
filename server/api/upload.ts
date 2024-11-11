import fs from 'fs';
import path from 'path';
import { defineEventHandler, sendError, H3Error, readFormData } from 'h3';

const uploadDir = path.join(process.cwd(), 'public/uploads');

export default defineEventHandler(async(event) => {
    try {
        const formData = await readFormData(event);
        const file = formData.get('file') as File;

        if (!file) {
            const error = new H3Error('No file uploaded');
            error.statusCode = 400;  // 手动设置状态码
            error.fatal = false;     // 设置fatal
            error.unhandled = true;  // 设置unhandled
            throw error;
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const filePath = path.join(uploadDir, file.name);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        await fs.promises.writeFile(filePath, buffer);

        const imageUrl = `/uploads/${file.name}`;
        return { imageUrl };
    } catch (error) {
        console.error('Upload failed with error:', error);

        // 其他错误
        const genericError = new H3Error('Failed to upload file');
        genericError.statusCode = 500;
        genericError.fatal = true;
        genericError.unhandled = true;
        genericError.cause = error;  // 添加原始错误作为原因
        return sendError(event, genericError);
    }
})
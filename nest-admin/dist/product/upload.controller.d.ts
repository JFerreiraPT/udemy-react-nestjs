/// <reference types="multer" />
import { Response } from 'express';
export declare class UploadController {
    uploadFile(file: Express.Multer.File): {
        url: string;
    };
    getImage(path: string, res: Response): Promise<void>;
}

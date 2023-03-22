import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller()
export class UploadController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename(_, file, callback) {
          const randomName =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(23).substring(2, 5);
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `http://localhost:8000/api/${file.path}`,
    };
  }

  @Get('files/:path')
  async getImage(@Param('path') path: string, @Res() res: Response) {
    res.sendFile(path, { root: 'uploads' });
  }
}

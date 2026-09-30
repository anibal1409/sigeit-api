import { ApiBodyOptions } from '@nestjs/swagger';

/** Archivo recibido vía multipart (subconjunto de `Express.Multer.File`). */
export interface UploadedFileData {
  buffer: Buffer;
  originalname: string;
}

/** Tamaño máximo de los archivos que se suben a la API (5 MB). */
export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;

/** Cuerpo Swagger de un formulario multipart con un único campo `file`. */
export const FILE_UPLOAD_BODY: ApiBodyOptions = {
  schema: {
    type: 'object',
    required: ['file'],
    properties: { file: { type: 'string', format: 'binary' } },
  },
};

import { wrapHandler } from '../../common/wrapHandler';
import * as uploadController from './upload.controller';

export const upload = wrapHandler(async (req, res) => {
  const buffer = req.file?.buffer;

  const fileResult = await uploadController.upload(buffer as Buffer);
  return fileResult;
});

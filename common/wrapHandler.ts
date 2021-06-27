import { Request, RequestHandler, Response } from 'express';

export const wrapHandler: (
  handler: (req: Request, res: Response) => Promise<any>
) => RequestHandler = (handler) => {
  return (req, res, next) => {
    handler(req, res)
      .then((data) => {
        return res.send({ success: 1, data });
      })
      .catch(next);
  };
};

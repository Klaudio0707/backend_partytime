// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class EmptyStringToNullMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     // Verifica se o corpo da requisição existe e é um objeto
//     if (req.body && typeof req.body === 'object') {
//       // procura sobre todas as chaves do objeto no corpo da requisição
//       Object.keys(req.body).forEach(key => {
//         // Se o valor de uma chave for uma string estritamente vazia...
//         if (req.body[key] === '') {
//           // ...nós o transformamos em 'null'.
//           req.body[key] = null;
//         }
//       });
//     }

//     next();
//   }
// }
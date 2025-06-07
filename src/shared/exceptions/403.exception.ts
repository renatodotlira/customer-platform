import { HttpStatus } from "../../presentation/routers/index.route";

export class ForbiddenException {
  constructor(...objectError: any[]) {
    throw {
      status: HttpStatus.FORBIDDEN,
      error: 'Forbidden',
      message: objectError.length > 0 ? objectError : undefined,
    };
  }
}

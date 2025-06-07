import { HttpStatus } from "../../presentation/routers/index.route";

export class BadRequestException {
  constructor(...objectError: any[]) {
    throw {
      status: HttpStatus.BAD_REQUEST,
      message: objectError.length > 0 ? objectError : undefined,
    };
  }
}

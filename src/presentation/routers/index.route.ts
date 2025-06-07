import { Router } from 'express';
import fs from 'fs';
import { userRoutes } from './user.route';
import { appointmentRoutes } from './appointment.route';
import { employeeRoutes } from './employee.route';
import { whatsappInstanceRoutes } from './whatsappInstance.route';
import { businessRoutes } from './business.route';

enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  UNSUPPORTED_MEDIA_TYPE = 415,
  IM_A_TEAPOT = 418,
  INSUFFICIENT_SPACE_ON_RESOURCE = 419,
  UNPROCESSABLE_ENTITY = 422,
  UPGRADE_REQUIRED = 426,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  NOT_EXTENDED = 510,
  BANDWIDTH_LIMIT_EXCEEDED = 509
}

const router = Router();

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

router.get('/', async (req, res) => {
	res.status(HttpStatus.OK).json({
		status: HttpStatus.OK,
		message: 'Welcome inerchat API, it is working!',
		version: packageJson.version,
	});
})
router.use('/user', userRoutes)
router.use('/appointment', appointmentRoutes)
router.use('/employee', employeeRoutes)
router.use('/whatsapp-instance', whatsappInstanceRoutes)
router.use('/business', businessRoutes);

export { HttpStatus, router };

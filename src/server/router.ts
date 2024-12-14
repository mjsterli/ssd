import { Router } from 'express';
import { getEmployees } from './handlers/employee';
import { getCustomerByPhoneNumber } from './handlers/customer';
const router = Router();

router.get('/employee', getEmployees);
router.get('/customer/:phonenumber', getCustomerByPhoneNumber);

export default router;
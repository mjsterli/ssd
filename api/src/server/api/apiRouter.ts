import { Router } from "express";
import { getEmployees } from "./handlers/employee";
import {
  getCustomerByPhoneNumber,
  getCustomers,
  getCustomersWithOrders
} from "./handlers/customer";
import { getOrders, getOrder } from "./handlers/order";

const router = Router();

router.get("/employees", getEmployees);
router.get("/customers", getCustomers);
router.get("/customers/orders", getCustomersWithOrders);
router.get("/customer/:phonenumber", getCustomerByPhoneNumber);
router.get("/orders", getOrders);
router.get("/order/:orderid", getOrder);

export default router;

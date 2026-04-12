import { Router } from "express";
import { getEmployees } from "./handlers/employee";
import {
  getCustomerByPhoneNumber,
  getCustomers,
  getCustomersWithOrders
} from "./handlers/customer";
import { getOrders, getOrder } from "./handlers/order";
import { getDashboard } from "./handlers/dashboard";
import { fulfillOrder } from "./handlers/fulfillment";

const router = Router();

router.get("/employees", getEmployees);
router.get("/customers", getCustomers);
router.get("/customers/orders", getCustomersWithOrders);
router.get("/customer/:phonenumber", getCustomerByPhoneNumber);
router.get("/orders", getOrders);
router.get("/order/:orderid", getOrder);
router.get("/dashboard", getDashboard);
router.post("/order/:orderid/fulfill", fulfillOrder);

export default router;

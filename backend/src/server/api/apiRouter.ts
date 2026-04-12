import { Router } from "express";
import { getEmployees } from "./handlers/employee";
import {
  getCustomerByPhoneNumber,
  getCustomers,
  getCustomersWithOrders
} from "./handlers/customer";
import { getOrders, getOrder } from "./handlers/order";
import { getDashboard } from "./handlers/dashboard";
import { getServices, updateOrder } from "./handlers/orderUpdate";
import { fulfillOrder } from "./handlers/fulfillment";
import { removeOrder } from "./handlers/removal";

const router = Router();

router.get("/employees", getEmployees);
router.get("/customers", getCustomers);
router.get("/customers/orders", getCustomersWithOrders);
router.get("/customer/:phonenumber", getCustomerByPhoneNumber);
router.get("/orders", getOrders);
router.get("/order/:orderid", getOrder);
router.get("/dashboard", getDashboard);
router.get("/services", getServices);
router.patch("/order/:orderid", updateOrder);
router.post("/order/:orderid/fulfill", fulfillOrder);
router.post("/order/:orderid/remove", removeOrder);

export default router;

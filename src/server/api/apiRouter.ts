import { Router } from "express";
import { getEmployees } from "./handlers/employee";
import { getCustomerByPhoneNumber } from "./handlers/customer";
import { getOrders, getOrder } from "./handlers/order";

const router = Router();

router.get("/employees", getEmployees);
router.get("/customer/:phonenumber", getCustomerByPhoneNumber);
router.get("/orders", getOrders);
router.get("/order/:orderid", getOrder);
router.get("/order", getOrder);

export default router;

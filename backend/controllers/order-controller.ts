import { OrderModel } from "../models/order-model";
import { ExtendedRequest, ExtendedResponse } from "../types/global";
import asyncHandler from "../middleware/async-handler";

// @desc    Add order items
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(
  async (req: ExtendedRequest, res: ExtendedResponse) => {
    if (!req.user) throw new Error("User not found");

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    } else {
      const order = new OrderModel({
        orderItems: orderItems.map((item: { _id: string }) => ({
          ...item,
          product: item._id,
          _id: undefined,
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  }
);

// @desc    Get logged-in user's order
// @route   POST /api/orders/my-orders
// @access  Private
const getMyOrders = asyncHandler(
  async (req: ExtendedRequest, res: ExtendedResponse) => {
    if (!req.user) throw new Error("User not found");
    const orders = await OrderModel.find({ user: req.user._id });
    res.status(200).json(orders);
  }
);

// @desc    Get order by ID
// @route   POST /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(
  async (req: ExtendedRequest, res: ExtendedResponse) => {
    if (!req.user) throw new Error("User not found");
    const order = await OrderModel.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  }
);

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(
  async (req: ExtendedRequest, res: ExtendedResponse) => {
    if (!req.user) throw new Error("User not found");
    res.send("order updated to paid");
  }
);

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(
  async (req: ExtendedRequest, res: ExtendedResponse) => {
    if (!req.user) throw new Error("User not found");
    res.send("order updated to delivered!");
  }
);

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(
  async (req: ExtendedRequest, res: ExtendedResponse) => {
    if (!req.user) throw new Error("User not found");
    res.send("here are all orders!");
  }
);

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};

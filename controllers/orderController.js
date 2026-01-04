import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export const createOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    const totalAmount = cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
    });
    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).populate("items.product");
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("items.product")
      .populate("user");
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    order.status = status;
    await order.save();
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

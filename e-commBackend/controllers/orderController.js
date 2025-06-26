import asyncHandler from "../utils/asyncHandler.js";
import Order from "../models/orderModel.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const order = new Order({
    user: req.user._id,
    orderItems: req.body.orderItems.map(item => ({
      name: item.name,
      qty: item.qty,
      image: item.image,
      price: item.price,
      product: item.productId
    })),
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemPrice: req.body.itemPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    // isPaid, paidAt, isDelivered, deliveredAt will use defaults or be set later
  });

  const createdOrder = await Order.save();
  return res.status(201).json(createdOrder);
});


const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email',
  )

  if (order) {
    if (req.user.isAdmin || order.user._id.toString() === req.user._id.toString()) {
      return res.status(200).json(order);
    } else {
      res.status(400);
      throw new Error('Not authorized to view this order.');
    };
  } else {
    res.status(404);
    throw new Error('Order not found.');
  };
});


const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  return res.status(200).json(orders);
});


const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name email');
  return res.status(200).json(orders);
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    return res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found.');
  };
});


export { addOrderItems, getOrderById, getMyOrders, getOrders, updateOrderToDelivered }

// src/middleware/notFoundHandler.js


// коли клієнт звертається до неіснуючого маршруту
export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: 'Route not found' });
};

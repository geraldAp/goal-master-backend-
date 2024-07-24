const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: "Route Not Found " });
};

export default notFoundHandler;

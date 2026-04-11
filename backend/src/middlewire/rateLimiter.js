import retLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await retLimit.limit(req.ip);
    if (!success) {
      return res.status(429).json({ error: "You're sending requests too quickly. Please wait a moment and try again." });
    }
    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default rateLimiter;
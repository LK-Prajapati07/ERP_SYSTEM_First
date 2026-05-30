import admin from "../config/firebaseAdmin.js";

export const verifyAuth = async (req, res, next) => {
  try {

    const sessionCookie = req.cookies?.session;

    if (!sessionCookie) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const decodedToken = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);

    req.user = decodedToken;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired session",
      error: error.message,
    });

  }
};
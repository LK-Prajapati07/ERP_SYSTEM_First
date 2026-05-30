import admin from "../config/firebaseAdmin.js";
import { User } from "../models/user.model.js";

export const firebaseLogin = async (req, res) => {
  try {
    const { idToken,gender,phoneNumber } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "ID token is required" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, firebase, email_verified } = decodedToken;
    if(!email){
      return res.status(400).json({
        message:"Email not found"
      })
    }
    const domain=email.split("@")[1]
    const allowedDomains = ["agra.sharda.ac.in"];
    if(!allowedDomains.includes(domain)){
      return res.status(403).json({
       message:"Unauthorized domain"
      })
    }

    const provider = firebase?.sign_in_provider;

    // if (provider === "password" && !email_verified) {
    //   return res.status(403).json({ message: "Please verify your email" });
    // }
    

    const expiresIn = 7 * 24 * 60 * 60 * 1000;

    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("session", sessionCookie, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: expiresIn,
    });

    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({
        uid,
        email: email || "",
        name: name || "",
        provider,
        role:'Student',
        AccountStatus:'active',
        gender,
        phoneNumber
      });
    }

    return res.status(200).json({
      message: "Authenticated successfully",
      user,
    });
  } catch (error) {
    if (error.code?.startsWith("auth/")) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const sessionCookie = req.cookies.session;

    if (!sessionCookie) {
      return res.status(401).json({ message: "Unauthorized: No session" });
    }
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);

    await admin.auth().revokeRefreshTokens(decoded.uid);

    res.clearCookie("session", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired session" });
  }
};
export const getCurrentUser = async (req, res) => {
  try {
    const uid = req.user.uid;
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error ` });
  }
};

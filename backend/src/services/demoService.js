import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export const createDemoSession = async () => {
//   const templateUser = await prisma.user.findFirst({
//     where: {
//       isDemoTemplate: true
//     }
//   });

//   if (!templateUser) {
//     throw new Error("Demo template user not configured");
//   }

  const randomEmail =
    `demo-${crypto.randomUUID()}@demo.local`;

  const randomPassword =
    crypto.randomBytes(32).toString("hex");

  const hashedPassword = await bcrypt.hash(
    randomPassword,
    10
  );

  const expiresAt = new Date(
    Date.now() + 2 * 60 * 60 * 1000
  );

  const demoUser = await prisma.user.create({
    data: {
      email: randomEmail,
      password: hashedPassword,
      isDemo: true,
      demoExpiresAt: expiresAt
    }
  });

  const token = jwt.sign(
    {
      userId: demoUser.id,
      isDemo: true
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h"
    }
  );

  return {
    token,
    user: {
      name:'Demo User',
      email: demoUser.email,
      isDemo: true
    }
  };
};
import { ValidationError } from "@repo/error-handler/src/app-error.js";
import { sellerSchema, userSchema } from "../schema/user.schema.js";
import {redis} from "@repo/redis";
import { NextFunction } from "express";
import crypto from "crypto";
import { sendMail } from "./sendEmail/index.js";

export const validateRegistrationData = (data: any, userType: "user" | "seller") => {
    const schema = userType === "user" ? userSchema : sellerSchema;

    const result = schema.safeParse(data);
    if(!result.success){
        throw new ValidationError(result.error.message);
    }

    return result.data;
}

export const checkOtpRestrictions = async(email: string, next: NextFunction) => {
    if(await redis.get(`otp_lock:${email}`)){
        return next(new ValidationError("Account locked due to multiple failed attempts! Try agian after 30 minutes."))
    }

    if(await redis.get(`otp_spam_lock:${email}`)){ // Ye track otp me set kiya hu
        return next(new ValidationError("Too many requests! Please try agian after one hour."))
    }

    if (await redis.get(`otp_cooldown:${email}`)) {  // ye sendOtp me set kiya hu
        return next(new ValidationError("Please wait 1minute before requesting a new OTP!"));
    }
}

export const trackOtpRequests = async (email: string, next: NextFunction) => {
    const otpRequestKey = `otp_request_count:${email}`;

    let otpRequests = parseInt((await redis.get(otpRequestKey)) || "0");

    if (otpRequests >= 2) {
        await redis.set(`otp_spam_lock:${email}`, "locked", "EX", 3600);
        return next(new ValidationError("Too many OTP requests. Please wait 1 hour before requesting again"));
    }

    await redis.set(otpRequestKey, otpRequests + 1, "EX", 3600);
}

export const sendOtp = async (name: string, email: string) => {
    const otp = crypto.randomInt(1000, 9999).toString();
    await sendMail(email, "Verify your email", `<p>${name} your otp is this => ${otp}<p>`);
    await redis.set(`otp:${email}`, otp, "EX", 300);
    await redis.set(`otp_cooldown:${email}`, "true", "EX", 60);
}
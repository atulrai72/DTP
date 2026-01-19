import { NextFunction, Request, Response} from "express";
import { checkOtpRestrictions, sendOtp, trackOtpRequests, validateRegistrationData } from "../utils/auth.utils.js";
import { db, users, eq } from "@repo/db";
import { ValidationError } from "@repo/error-handler/src/app-error.js";

export const userRegistration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, name, password} = validateRegistrationData(req.body, "user");

        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email),
        })   // SQL Like also works but it return thr empty array, so handle the case like existingUser.empty() like this.

        if(existingUser){
            return next(new ValidationError("User already exists."));
        }
       
    await checkOtpRestrictions(email, next);
    await trackOtpRequests(email, next);
    await sendOtp(name, email);

    res.status(200).json({
        message: "Otp sent to mail. Please verify your account."
    })

    } catch (error) {
        console.log(error);
        return next(error);
    }
}
import * as z from "zod";

export const userSchema = z.object({
    name : z.string().min(3, {message : "Name must be at least 3 characters long"}),
    email : z.string().email({message : "Invalid email address"}),
    password : z.string().min(6, {message : "Password must be at least 6 characters long"}),
})

export const sellerSchema = z.object({
    name : z.string().min(3, {message : "Name must be at least 3 characters long"}),
    email : z.string().email({message : "Invalid email address"}),
    password : z.string().min(6, {message : "Password must be at least 6 characters long"}),
    phone_number : z.string().min(10, {message : "Phone number must be at least 10 characters long"}),
    country : z.string().min(3, {message : "Country must be at least 3 characters long"})
})
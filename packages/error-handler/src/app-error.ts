export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly details: string;

    constructor(message: string, statusCode: number, isOperational: boolean = true, details : any = null){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;
        Error.captureStackTrace(this);
    }
}

//Not found error

export class NotFound extends AppError{
     constructor(message = "Resourses not found"){
        super(message, 404);
     }
}

// Validation Error (use for Joi/zod/react-hook-form validation errors)

export class ValidationError extends AppError{
    constructor(message = "Invalid data"){
        super(message, 400, true);
    }
}

// Authentication error
export class AuthError extends AppError{
    constructor(message = "Unauthorized"){
        super(message, 401);
    }
}


// Forbidden error (For insufficient permissions)

export class ForbiddenError extends AppError{
    constructor(message = "Forbidden access"){
        super(message, 403);
    }
}

// Database Error (For mongodb / Postgres error)

export class DatabaseError extends AppError{
    constructor(message = "Database error", details?: any){
        super(message,500, true, details);
    }
}

// Rate limit error

export class RateLimitError extends AppError{
    constructor(message = "Too many requests, please try again later!"){
        super(message, 429);
    }
}


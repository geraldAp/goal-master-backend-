import { object, string } from "joi";


const validateUserSignUpCredentials = (firstName, lastName, userName, email, password) => {
    const schema = object({
      firstName: string()
        .min(2)
        .required()
        .messages({
          "string.empty": "First Name is required",
          "any.required": "First Name is required",
          "string.min": "First Name must be at least 6 characters long",
        }),
      lastName: string()
        .min(2)
        .required()
        .messages({
          "string.empty": "Last Name is required",
          "any.required": "Last Name is required",
          "string.min": "Last Name must be at least 6 characters long",
        }),
      userName: string()
        .min(3)
        .required()
        .messages({
          "string.empty": "User Name is required",
          "any.required": "User Name is required",
          "string.min": "User Name must be at least 6 characters long",
        }),
      email: string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .messages({
          "string.email": "Please enter a valid email address",
          "string.empty": "Email is required",
          "any.required": "Email is required",
        }),
      password: string()
        .min(6)
        .required()
        .messages({
          "string.empty": "Password is required",
          "any.required": "Password is required",
          "string.min": "Password must be at least 6 characters long",
        }),
    });
  
    const { error, value } = schema.validate(
      { firstName, lastName, userName, email, password },
      { abortEarly: false }
    );
  
    return {
      firstName: {
        error: error && error.details.find((detail) => detail.context.key === "firstName"),
      },
      lastName: {
        error: error && error.details.find((detail) => detail.context.key === "lastName"),
      },
      userName: {
        error: error && error.details.find((detail) => detail.context.key === "userName"),
      },
      email: {
        error: error && error.details.find((detail) => detail.context.key === "email"),
      },
      password: {
        error: error && error.details.find((detail) => detail.context.key === "password"),
      },
    };
  };
const validateUserLoginCredentials = (userName, password) => {
  const schema = object({
    userName: string()
      .min(6) // Example: Minimum 6 characters
      .required()
      .messages({
        "string.empty": "User Name is required",
        "any.required": "User Name is required",
        "string.min": "User Name must be at least 6 characters long",
      }),
    password: string()
      .min(6) // Example: Minimum 6 characters
      .required()
      .messages({
        "string.empty": "Password is required",
        "any.required": "Password is required",
        "string.min": "Password must be at least 6 characters long",
      }),
  });

  const { error, value } = schema.validate(
    {  userName, password },
    { abortEarly: false }
  );

  return {
    userName: {
      error:
        error &&
        error.details.find((detail) => detail.context.key === "userName"),
    },
    password: {
      error:
        error &&
        error.details.find((detail) => detail.context.key === "password"),
    },
  };
};

export default {validateUserSignUpCredentials , validateUserLoginCredentials}

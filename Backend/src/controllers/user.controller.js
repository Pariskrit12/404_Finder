import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { sendWelcomeMail } from "../service/sendWelcomeMail.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new ApiError(400, "All fileds are required");
  }

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[@])[A-Za-z@]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new ApiError(
      400,
      "Invalid password format, password should contain atleast one capital letter, one special character and atleast one number"
    );
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email: email,
    password: password,
  });

  const createdUser = await User.findById(user?._id).select("-password");
  if (!createdUser) {
    throw new ApiError(404, "User not found");
  }

  sendWelcomeMail(username, email);

  res
    .status(200)
    .json(new ApiResponse(200, createdUser, "UserCreatedSuccessfully"));
});
export { userRegister };

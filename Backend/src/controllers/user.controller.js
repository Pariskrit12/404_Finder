import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { sendWelcomeMail } from "../service/sendWelcomeMail.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
const generateAccessAndRefreshToken = async function (userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not Found");
    }
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};
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

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "All Fields are required");
  }

  const userExist = await User.findOne({ username });
  if (!userExist) {
    res.status(400).json({
      field: "username",
      message: "Username doesnot exist",
    });
  }

  const isMatch = await userExist.comparePassword(password);
  if (!isMatch) {
    res.status(400).json({
      field: "password",
      message: "Password is wrong",
    });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    userExist?._id
  );

  const loggedIn = await User.findById(userExist._id).select(
    "-password -refreshToken"
  );
  const option = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(201)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(
        201,
        { user: loggedIn, accessToken, refreshToken },
        "User logged in Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, "User logged out successfully"));
});

const refreshTokenRegenerate = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Invalid authorization");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token didnot matched");
    }

    const option = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user?._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, option)
      .cookie("refreshToken", newRefreshToken, option)
      .json(
        200,
        { accessToken, newRefreshToken },
        "Access Token refreshed Successfully"
      );
  } catch (error) {}
});

const sendMessage = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, "yooooooooo"));
});

export { userRegister, loginUser, sendMessage, logoutUser };

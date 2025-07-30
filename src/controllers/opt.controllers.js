import { Otp } from "../models/otp.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import otpGenerator from "otp-generator";

const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is Required");
  }
  const checkUserPresent = await User.findOne({ email });
  if (checkUserPresent) {
    throw new ApiError(401, "User Already Exist");
  }
  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  let result = await Otp.findOne({ otp: otp });
  while (result) {
    otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    result = await Otp.findOne({ otp: otp });
  }
  const otpPayload = { email, otp };
  const otpBody = await Otp.create(otpPayload);

  if (!otpBody) {
    throw new ApiError(500, "Something went wrong while registeration");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, [], "OTP Sent Successfully"));
});

export { sendOtp };

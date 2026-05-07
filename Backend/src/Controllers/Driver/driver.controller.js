import { ApiError } from "../../../src/Utils/apiErrors.js";
import { ApiResponse } from "../../../src/Utils/apiResponse.js";
import { Driver } from "../../../src/Models/Driver/driver.model.js";



// helper funtion fot genrate tokon
const genrateAccessAndRefreshToken = async (userId) => {
  try {
    const driver = await Driver.findById(userId);

    const accesToken = driver.generateAccessToken();
    const refreshToken = driver.generateRefreshToken();

    driver.refreshToken = refreshToken;
    await driver.save({ validateBeforeSave: false });

    return { accesToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while genrating refresh and access token",
    );
  }
};


// driver register api 
const DriverRegister = async (req, res) => {
  try {
    const {
      driver_name,
      email,
      password,
      mobile_number,
      vehicle_type,
      license_number,
      vehicle_number,
      address,
      city,
      state,
      pincode,
    } = req.body;

    console.log("req.body", req.body);

    if (!driver_name || !email || !password || !vehicle_type) {
      throw new ApiError(400, "All required fields are mandatory");
    }

    const exideteDriver = await Driver.findOne({
      $or: [{ email, mobile_number }],
    });

    if (exideteDriver) {
      throw new ApiError(400, "Driver allready register");
    }

    const driverCreate = await Driver.create({
      driver_name,
      email,
      password,
      mobile_number,
      vehicle_type,
      license_number,
      vehicle_number,
      address,
      city,
      state,
      pincode,
    });

    if (!driverCreate) {
      throw new ApiError(400, "driver not created");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { driverCreate }, "driver registered succesfully"),
      );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};


// Driver login api 
const DriverLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body)

    if (!email || !password) {
      throw new ApiError(400, "all filed required");
    }

    const driver = await Driver.findOne({
      $or: [{ email }],
    });

    console.log("driver",driver)

    if (!driver) {
      throw new ApiError(400, "driver not exit");
    }

    const isuserpasswordValid = await driver.isPasswordCorrect(password);

    if (!isuserpasswordValid) {
      throw new ApiError(401, "Password is invaild");
    }

    const { accesToken, refreshToken } = await genrateAccessAndRefreshToken(
      driver._id,
    );

    const loginDriver = await Driver.findById(driver._id).select(
      "-password -refreshToken",
    );

    // send cookie
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    };

    return res
      .status(200)
      .cookie("accessToken", accesToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          201,
          {
            user: loginDriver,
            accesToken,
            refreshToken,
          },
          "driver loaged in succesfully",
        ),
      );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};


// logout api
const DriverLogout = async (req, res) => {
  try {

    await Driver.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      },
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "user logout succesfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};



const  GetCurrectDriver = async (req,res) => {
  try {

    // const userId = req.user._id;
    const userId = "69fcf5be9cad0cfe1ff7ff3f";


    const  currentDeriver = await Driver.findById(userId);

    return res.status(200).json(
      new ApiResponse(200,currentDeriver, "driver get success")

    )
    
  } catch (error) {
     throw new ApiError(400, error.message);
    
  }
}

export { DriverRegister ,DriverLogin,DriverLogout, GetCurrectDriver};

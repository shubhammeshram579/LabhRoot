import { ApiError } from "../../../src/Utils/apiErrors.js";
import { ApiResponse } from "../../../src/Utils/apiResponse.js";
import { Driver } from "../../../src/Models/Driver/driver.model.js";

const DriverRegister = async (req, res) => {
  try {
    const {
      driver_name,
      email,
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

    if (!driver_name || !email || !vehicle_type) {
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
      mobile_number,
      vehicle_type,
      license_number,
      vehicle_number,
      address,
      city,
      state,
      pincode,
    });

    if(!driverCreate){
        throw new ApiError(400, "driver not created")
    }


    return res.status(200).json(
        new ApiResponse(200,{driverCreate},"driver registered succesfully")
    )

  } catch (error) {
     throw new ApiError(500, error.message);
  }
};


export { DriverRegister };

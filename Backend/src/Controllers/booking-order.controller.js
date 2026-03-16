import { ApiError } from "../Utils/apiErrors.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { BookingOrder } from "../Models/booking-order.model.js";

const CreateBookingOrder = async (req, res) => {
  try {
    const {
      vehicleName,
      priceToll,
      netvalue,
      paidprice,
      weight,
      size,
      paymentMode,
      goodsTypes,
      owner,
      bookingAddressId,
    } = req.body;

    const userId = req.user?._id;

    if (!vehicleName || !paidprice || !paymentMode || !goodsTypes) {
      throw new ApiError(400, "all filed is required");
    }

    const createBookingOrder = await BookingOrder.create({
      vehicleName,
      priceToll,
      netvalue,
      paidprice,
      weight,
      size,
      paymentMode,
      goodsTypes,
      owner: userId,
      bookingAddressId,
    });

    if (!createBookingOrder) {
      throw new ApiError(400, "bookingorder not created");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { createBookingOrder },
          "bookingOrder succesfully",
        ),
      );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};



const GetBookingOrderbyId = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      throw new ApiError(400, "bookingId not found ");
    }

    const bookingOrder = await BookingOrder.findById(bookingId);

    if (!bookingOrder) {
      throw new ApiError(400, "bookingorder not found ");
    }

    return res
      .status(200)
      .json(new ApiResponse(201, { bookingOrder }, "booking order get succes"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { CreateBookingOrder, GetBookingOrderbyId };

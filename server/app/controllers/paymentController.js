const Stripe = require("stripe");
const Train = require("../models/Train");
const Ticket = require("../models/Ticket");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment session
const createPaymentSession = async (req, res) => {
  const { trainId, date, seatNumber } = req.body;

  try {
    const train = await Train.findById(trainId);
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    const existingTickets = await Ticket.find({
      train: train._id,
      date,
      seatNumber: seatNumber,
    });

    if (existingTickets.length > 0) {
      return res.status(400).json({ message: "Seat is already booked" });
    }

    if (seatNumber > train.capacity) {
      return res.status(400).json({ message: "Seat is not available" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "pkr",
            product_data: {
              name: `Train Booking: ${train.name}`,
              description: `Route: ${train.route.start} to ${train.route.end}`,
            },
            unit_amount: train.pricePerSeat * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        trainId: train._id.toString(),
        date,
        seatNumber,
        userId: req.user._id.toString(),
        amount: train.pricePerSeat,
      },
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-failure`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPaymentSession,
};

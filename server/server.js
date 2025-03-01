require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config({ debug: "true" });
console.log(process.env.PUBLISHABLE_KEY_STRIPE);
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 4242;

const stripe = require("stripe")(process.env.SECRET_KEY_STRIPE);

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    allowedHeaders: "Content-type, Authorization",
  })
);
app.use(bodyParser.json());
app.get("/config", (req, res) => {
  res.json({ publishableKey: process.env.PUBLISHABLE_KEY_STRIPE });
});
/*
app.post("create-checkoutsession", async (req, res) => {
  const { items } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items,
    mode: "payment",
    success_url: "localhost:4200",
    cancel_url: "localhost:4200",
  });
  res.json({ id: session.id });
});
 */

app.post("/create-checkout-session", async (req, res) => {
  try {
    const items = req.body.items;
    console.log("server logging items:");
    console.log(items);
    const lineItems = items.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
      //tax_rates: ['txcd_20030000']
      //automatic_tax: enabled,
    }));
    console.log("server side array check: ");
    console.log(Array.isArray(items));

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: lineItems,
      mode: "payment",
      return_url: `http://localhost:4200/menu`,
    });

    res.send({ id: session.id });
  } catch (error) {
    console.error("error creating checkout session", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});
app.listen(4242, () => console.log("Server is running on port 4242"));

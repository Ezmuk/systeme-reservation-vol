import express from "express";
import cors from "cors"; // Import the cors middleware
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Récupérer les vols disponibles entre deux lieux
app.get("/flights", async (req, res) => {
  const { departure, destination } = req.query;
  const flights = await prisma.flight.findMany({
    where: {
      departure_location: departure,
      destination_location: destination,
    },
  });
  res.json(flights);
});

// Créer une nouvelle réservation
app.post("/bookings", async (req, res) => {
  const { userId, flightId } = req.body;
  const booking = await prisma.booking.create({
    data: {
      userId,
      flightId,
    },
  });
  res.json(booking);
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

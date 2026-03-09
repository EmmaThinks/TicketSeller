import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import cors from "cors";
import "dotenv/config";
import pg from "pg";

const app = express();
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
  adapter,
});
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Encendido en el puerto: ${PORT}`);
});

app.post("/api/conciertos", async (req, res) => {
  try {
    const {
      titulo,
      fecha,
      lugar,
      capacidad,
      precio,
      banda,
      descripcion,
      fotoConcierto,
    } = req.body;
    const nuevoConcierto = await prisma.concert.create({
      data: {
        titulo: titulo,
        banda: banda,
        fotoConcierto: fotoConcierto,
        descripcion: descripcion,
        fecha: new Date(fecha),
        lugar: lugar,
        capacidad: parseInt(capacidad),
      },
    });
    let ticketArray = [];
    for (let i = 0; i < capacidad; i++) {
      ticketArray.push({ precio: precio, conciertoId: nuevoConcierto.id });
    }

    await prisma.ticket.createMany({ data: ticketArray });
    res.status(201).json(nuevoConcierto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "hubo un problema creando el concierto" });
  }
});

app.get("/api/conciertos", async (req, res) => {
  try {
    const conciertos = await prisma.concert.findMany();

    res.status(200).json(conciertos);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      data: "hubo un problema obteniendo los conciertos disponibles ",
    });
  }
});

app.delete("/api/conciertos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.ticket.deleteMany({ where: { conciertoId: id } });
    await prisma.concert.delete({ where: { id: id } });
    res
      .status(200)
      .json({ mensaje: "Concierto y tickets eliminados correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      data: "hubo un problema intentando borrar el concierto seleccionado",
    });
  }
});

app.put("/api/conciertos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, fecha, lugar, descripcion, banda, fotoConcierto } =
      req.body;

    const datosAActualizar: any = {};

    if (titulo) datosAActualizar.titulo = titulo;
    if (lugar) datosAActualizar.lugar = lugar;
    if (fecha) datosAActualizar.fecha = new Date(fecha);
    if (banda) datosAActualizar.banda = banda;
    if (descripcion) datosAActualizar.descripcion = descripcion;
    if (fotoConcierto) datosAActualizar.FotoConcierto = fotoConcierto;

    await prisma.concert.update({
      where: { id: id },
      data: datosAActualizar,
    });

    res.status(200).json({ mensaje: "Concierto editado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      data: "Hubo un problema intentando editar el concierto",
    });
  }
});

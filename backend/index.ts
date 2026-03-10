import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import cors from "cors";
import "dotenv/config";
import pg from "pg";
import bcrypt from "bcryptjs";

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

// --- SISTEMA DE USUARIOS ---
app.post("/api/registro", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const usuarioExistente = await prisma.user.findUnique({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: "El correo ya está en uso" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = await prisma.user.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ mensaje: "Usuario creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await prisma.user.findUnique({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const passwordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecto) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.status(200).json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      fotoPerfil: usuario.fotoPerfil,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
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

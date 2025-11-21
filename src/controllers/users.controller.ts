import { Request, Response } from "express";
import { pool } from "../db.js";
import { uploadToSupabase } from "../supabaseStorage.js";

export const getUsers = async (req: Request, res: Response) => {
  const { rows } = await pool.query("SELECT * FROM users ORDER BY id");
  res.json(rows);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const { rows } = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );

  res.json(rows[0]);
};

export const uploadUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  let imageUrl = null;

  if (req.file) {
    const filename = `user_${Date.now()}_${req.file.originalname}`;
    imageUrl = await uploadToSupabase(req.file.buffer, filename); // Usar el buffer en lugar de la ruta
  }

  const { rows } = await pool.query(
    "INSERT INTO users (name, email, image_url) VALUES ($1, $2, $3) RETURNING *",
    [name, email, imageUrl]
  );

  res.json(rows[0]);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const { rows } = await pool.query(
    "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
    [name, email, id]
  );

  res.json(rows[0]);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
  res.json({ message: "User deleted" });
};

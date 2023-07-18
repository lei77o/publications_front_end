import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM user");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO user (firstName, lastName, email) VALUES (?,?,?)",
      [firstName, lastName, email]
    );
    res.send({
      id: rows.insertId,
      firstName,
      lastName,
      email,
    });
  } catch {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length <= 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.send({ rows });
  } catch {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM user WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.sendStatus(204);
  } catch {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    const [result] = await pool.query(
      "UPDATE user SET firstName = IFNULL(?, firstName), lastName = IFNULL(?, lastName), email = IFNULL(?, email) WHERE id = ?",
      [firstName, lastName, email, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "User not found",
      });

    const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

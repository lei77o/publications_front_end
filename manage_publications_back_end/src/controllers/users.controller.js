import {pool} from '../db.js'

export const getUsers = async (req, res)=>{
    const [rows] = await pool.query('SELECT * FROM user');
    res.json(rows)
};

export const createUser = async (req, res)=> {
    const {firstName, lastName, email} = req.body;
    const [rows] = await pool.query('INSERT INTO user (firstName, lastName, email) VALUES (?,?,?)', [ firstName, lastName, email])
    res.send({
        id: rows.insertId,
        firstName,
        lastName,
        email,
    })
};

export const getUser = async (req, res)=> {
    const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [req.params.id])
    if(rows.length <= 0){   
        return res.status(404).json({
            message: 'User not found'
        })
    }
    res.send({rows})
}

export const deleteUser = async (req, res)=> {
    const [result] = await pool.query('DELETE FROM user WHERE id = ?', [req.params.id])
    if (result.affectedRows <= 0){
        return res.status(404).json({
            message: 'User not found'
        })
    }
    res.sendStatus(204)
}

export const updateUser = async(req, res)=> {
    const {id} = req.params
    const {firstName, lastName, email} = req.body

    const [result] = await pool.query('UPDATE user SET firstName = IFNULL(?, firstName), lastName = IFNULL(?, lastName), email = IFNULL(?, email) WHERE id = ?', [firstName, lastName, email, id])

    if(result.affectedRows === 0) return res.status(404).json({
        message: 'User not found'
    })

    const [rows] = await pool.query('SELECT * FROM user WHERE id = ?',[id])
    res.json(rows[0])

};
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let usuario = await User.findOne({ email });
    if (usuario) {
      res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe con ese email',
      });
      return;
    }
    usuario = new User(req.body);
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    //Generar JWT
    // const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      // token,
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

export { register };

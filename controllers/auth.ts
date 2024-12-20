import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { generateJwt } from '../helpers/jwt';

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
    const token = await generateJwt(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) {
      res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese email',
      });
      return;
    }

    //Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      res.status(400).json({
        ok: false,
        msg: 'La contraseña no es correcta',
      });
      return;
    }
    //Generar nuestro jwt
    const token = await generateJwt(usuario.id, usuario.name);
    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  const { userId, userName } = req.body;

  //generar un nuevo JWT y retornarlo en la petición
  const token = await generateJwt(userId, userName);

  res.json({
    ok: true,
    token,
    userId,
    userName,
  });
};

export { register, login, refreshToken };

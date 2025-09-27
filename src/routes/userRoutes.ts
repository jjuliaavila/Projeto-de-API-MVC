import express from 'express';
import { UserController } from '../controller/UserController';

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/verify', userController.verificarUsuario);

userRouter.get('/', userController.obterTodosUsuarios);

userRouter.post('/', userController.registrarUsuario);

//pega usuario pelo id (exercicio 1)
userRouter.get('/:id', userController.obterUsuarioPorId)

//filtra usuarios por idade (exercicio 2)
userRouter.get('/age-range', userController.filtrarPorIdade);

//modifica usuario (exercicio 4)
userRouter.put('/:id', userController.modificarUsuario);

//exclui inativo (exercicio 7)
userRouter.delete('/cleanup-inactive', userController.excluirInativos);


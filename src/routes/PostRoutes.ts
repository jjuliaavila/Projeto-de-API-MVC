import express from 'express';
import { PostController } from '../controller/PostController';

export const postRouter = express.Router();

const postController = new PostController();

//exercicio 3 (cria post)
postRouter.post('/', postController.registrarPost);

//exercicio 5 (edita post)
postRouter.patch('/:id', postController.editarPost);

//exercicio 6 (deleta post)
postRouter.delete('/:id', postController.removerPost);
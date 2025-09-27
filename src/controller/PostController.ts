import { Request, Response } from 'express';
import { PostBusiness } from '../business/PostBusiness';
import { ApiResponse } from '../types';

export class PostController {
    postBusiness = new PostBusiness();

    //exercicio 3 (cria post)
    registrarPost = async (req: Request, res: Response) => {
        try {
            const { title, content, authorId } = req.body;
            const postCriado = this.postBusiness.registrarPost(title, content, authorId);
            
            const resposta: ApiResponse = {
                success: true,
                message: "Post foi registrado com sucesso",
                data: postCriado
            };
            res.status(201).json(resposta);
        } catch (erro: any) {
            const resposta: ApiResponse = {
                success: false,
                message: erro.message
            };
            res.status(400).json(resposta);
        }
    }

    //exercicio 5 (edita post)
    editarPost = async (req: Request, res: Response) => {
        try {
            const identificador = Number(req.params.id);
            const { title, content, published } = req.body;

            const dadosParaAtualizar: any = {};
            if (title !== undefined) dadosParaAtualizar.title = title;
            if (content !== undefined) dadosParaAtualizar.content = content;
            if (published !== undefined) dadosParaAtualizar.published = published;

            const mensagem = this.postBusiness.editarPostParcial(identificador, dadosParaAtualizar);
            
            const resposta: ApiResponse = {
                success: true,
                message: mensagem
            };
            res.status(200).json(resposta);
        } catch (erro: any) {
            const resposta: ApiResponse = {
                success: false,
                message: erro.message
            };
            
            const codigoStatus = erro.message.includes("não foi encontrado") ? 404 : 400;
            res.status(codigoStatus).json(resposta);
        }
    }

    //exercicio 6 (deleta post)
    removerPost = async (req: Request, res: Response) => {
        try {
            const postId = Number(req.params.id);
            const headerUserId = req.headers['user-id'];
            
            if (!headerUserId) {
                const resposta: ApiResponse = {
                    success: false,
                    message: "Header 'User-Id' é necessário"
                };
                return res.status(400).json(resposta);
            }
            
            const usuarioId = Number(headerUserId);
            const mensagem = this.postBusiness.excluirPost(postId, usuarioId);
            
            const resposta: ApiResponse = {
                success: true,
                message: mensagem
            };
            res.status(200).json(resposta);
        } catch (erro: any) {
            const resposta: ApiResponse = {
                success: false,
                message: erro.message
            };
            
            let codigoStatus = 400;
            if (erro.message.includes("não foi localizado")) {
                codigoStatus = 404;
            } else if (erro.message.includes("permissão")) {
                codigoStatus = 403;
            }
            
            res.status(codigoStatus).json(resposta);
        }
    }
}
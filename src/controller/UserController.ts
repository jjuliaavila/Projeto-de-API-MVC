import { Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';
import { users } from '../bd';
import { ApiResponse } from '../types';

export class UserController {
    userBusiness = new UserBusiness();

    verificarUsuario = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            const usuario = this.userBusiness.verificarUsuario(email);
            console.log("usuario localizado:", usuario);
            
            const resposta: ApiResponse = {
                success: true,
                message: "usuario foi encontrado",
                data: usuario
            };
            res.status(200).json(resposta);
        }catch (erro: any) {
            const resposta: ApiResponse = {
                success: false,
                message: erro.message
            };
            res.status(404).json(resposta);
        }
    }

    obterTodosUsuarios = async (req: Request, res: Response) => {
        try {
            const listaUsuarios = this.userBusiness.listarUsuarios();
            const resposta: ApiResponse = {
                success: true,
                message: "lista de usuarios obtida com sucesso",
                data: listaUsuarios
            };
            return res.status(200).json(resposta);
        } catch (erro: any) {
            const resposta: ApiResponse = {
                success: false,
                message: erro.message
            };
            res.status(500).json(resposta);
        }
    }

    registrarUsuario = async (req: Request, res: Response) => {
        try {
            const { id, name, email, role, age} = req.body;
            const dadosUsuario = { id, name, email, role, age};
            const usuarioCriado = this.userBusiness.registrarUsuario(dadosUsuario);
            
            const resposta: ApiResponse = {
                success: true,
                message: "usuario registrado com sucesso",
                data: usuarioCriado
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

    //exercicio 1 (busca usuario por id)
    obterUsuarioPorId = async (req: Request, res: Response) => {
        try {
            const identificador = Number(req.params.id);
            
            if (isNaN(identificador)) {
                const resposta: ApiResponse = {
                    success: false,
                    message: "o ID precisa ser um número valido"
                };
                return res.status(400).json(resposta);
            }
            
            const usuario = this.userBusiness.consultarPorId(identificador);
            const resposta: ApiResponse = {
                success: true,
                message: "Usuario localizado com sucesso",
                data: usuario
            };
            res.status(200).json(resposta);
        }catch (erro: any) {
            const resposta: ApiResponse = {
                success: false,
                message: erro.message
            };
            
            const codigoStatus = erro.message.includes("não foi encontrado") ? 404 : 400;
            res.status(codigoStatus).json(resposta);
        }
    }

    //exercicio 2 (busca usuarios por idade)
    filtrarPorIdade = async (req: Request, res: Response) => {
        try {
            const idadeMinima = Number(req.query.min);
            const idadeMaxima = Number(req.query.max);
            
            const usuariosEncontrados = this.userBusiness.buscarPorFaixaIdade(idadeMinima, idadeMaxima);

            const resposta: ApiResponse = {
                success: true,
                message: usuariosEncontrados.length > 0 
                    ? "Usuários encontrados na faixa etária especificada" 
                    : "Nenhum usuário encontrado nesta faixa de idade",
                data: usuariosEncontrados,
                total: usuariosEncontrados.length
            };
            res.status(200).json(resposta);
        }catch (erro: any) {
            const resposta: ApiResponse = {
                success: false,
                message: erro.message
            };
            res.status(400).json(resposta);
        }
    }

    //exercicio 4 (atualiza usuario)
    modificarUsuario = async (req: Request, res: Response) => {
        try {
            const identificador = Number(req.params.id);
            const { name, email, role, senha, age } = req.body;

            this.userBusiness.atualizarUsuarioCompleto(identificador, name, email, role, age);
            
            const resposta: ApiResponse = {
                success: true,
                message: "Usuario foi modificado com sucesso"
            };
            res.status(200).json(resposta);
        }catch (erro: any) {
            const resposta: ApiResponse = {
                success: false,
                message: erro.message
            };
            
            const codigoStatus = erro.message.includes("não localizado") ? 404 : 400;
            res.status(codigoStatus).json(resposta);
        }
    }

    //exercicio 7 (exclui usuarios inativos)
    excluirInativos = async (req: Request, res: Response) => {
        try{
            const confirmacao = req.query.confirm === 'true';

            const usuariosRemovidos = this.userBusiness.removerUsuariosInativos(confirmacao);
            
            const resposta: ApiResponse = {
                success: true,
                message: `Foram removidos ${usuariosRemovidos.length} usuários inativos`,
                data: usuariosRemovidos
            };
            res.status(200).json(resposta);
        }catch (erro: any) {
            const resposta: ApiResponse = {
                success: false,
                message: erro.message
            };
            res.status(400).json(resposta);
        }
    }
}
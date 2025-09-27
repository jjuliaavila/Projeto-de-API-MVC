import { users } from "../bd";
import { User } from "../types";

export class UserData {
    
    consultarUsuarioPorEmail = (email: string): User | undefined => {
        try {
            const usuarioLocalizado = users.find((usuario) => {
                return usuario.email === email;
            });
            return usuarioLocalizado;
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    listarTodosUsuarios = (): User[] => {
        try {
            return [...users]; 
        }catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    inserirUsuario = (usuario: User): void => {
        try {
            users.push(usuario);
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    //exercicio 1 (busca usuario por id)
    localizarUsuarioPorId = (identificador: number): User | undefined => {
        try {
            const resultado = users.find(u => u.id === identificador);
            return resultado;
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    //exercicio 2 (busca usuarios por idade) 
    filtrarUsuariosPorIdade = (idadeInicial: number, idadeFinal: number): User[] => {
        try {
            const usuariosFiltrados = users.filter(usuario => {
                return usuario.age >= idadeInicial && usuario.age <= idadeFinal;
            });
            return usuariosFiltrados;
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    //exercicio 4 (atualiza usuario)
    encontrarIndicePorId = (identificador: number): number => {
        try {
            const indiceEncontrado = users.findIndex(u => u.id === identificador);
            return indiceEncontrado;
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    modificarUsuario = (posicao: number, novosDados: User): void => {
        try {
            users[posicao] = novosDados;
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    //exercicio 7 (remove usuario que nao possui posts)
    removerUsuarioPorIndice = (posicao: number): void => {
        try {
            users.splice(posicao, 1);
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }
}
import { posts } from "../bd";
import { Post } from "../types";

export class PostData {

    adicionarPost = (novoPost: Post): void => {
        try {
            posts.push(novoPost);
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    // exercicio 5 (patch)
    localizarIndicePorId = (identificador: number): number => {
        try {
            const indicePost = posts.findIndex(post => post.id === identificador);
            return indicePost;
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    editarPost = (posicao: number, dadosAtualizados: Post): void => {
        try {
            posts[posicao] = dadosAtualizados;
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    // exercicio 6 (deleta o post)
    excluirPost = (posicao: number): void => {
        try {
            posts.splice(posicao, 1);
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    // exercicio 7 (pega os posts)
    obterTodosOsPosts = (): Post[] => {
        try {
            return [...posts]; 
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }
}
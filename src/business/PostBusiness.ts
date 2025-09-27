import { PostData } from "../data/PostData";
import { UserBusiness } from "./UserBusiness";
import { Post } from "../types";
import { posts, obterProximoIdPost } from "../bd";

export class PostBusiness {
    postData = new PostData();
    userBusiness = new UserBusiness();

    //exercicio 3 (cria post)
    registrarPost = (titulo: string, conteudo: string, autorId: number): Post => {
        try {
            if (!titulo || !conteudo || !autorId) {
                throw new Error("Dados incompletos");
            }
            if (titulo.length < 3) {
                throw new Error("Título precisa ter pelo menos 3 caracteres");
            }
            if (conteudo.length < 10) {
                throw new Error("Conteúdo precisa ter pelo menos 10 caracteres");
            }

            const autorExiste = this.userBusiness.consultarPorId(autorId);
            if (!autorExiste) {
                throw new Error("Autor não existe");
            }

            const novoId = obterProximoIdPost();

            const postNovo: Post = {
                id: novoId,
                title: titulo.trim(),
                content: conteudo.trim(),
                authorId: autorId,
                createdAt: new Date(),
                published: false,
            };

            this.postData.adicionarPost(postNovo);
            return postNovo;
        }catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    //exercicio 5 (edita post)
    editarPostParcial = (identificador: number, novasInformacoes: any): string => {
        try {
            const indicePost = this.postData.localizarIndicePorId(identificador);
            if (indicePost === -1) {
                throw new Error("Post não foi encontrado");
            }

            const postAtual = posts[indicePost];

            const camposValidos = ['title', 'content', 'published'];
            const camposEnviados = Object.keys(novasInformacoes);
            
            for (const campo of camposEnviados) {
                if (!camposValidos.includes(campo)) {
                    throw new Error(`Campo '${campo}' não pode ser alterado`);
                }
            }

            const postModificado = {
                ...postAtual,
                ...(novasInformacoes.title && { title: novasInformacoes.title.trim() }),
                ...(novasInformacoes.content && { content: novasInformacoes.content.trim() }),
                ...(novasInformacoes.published !== undefined && { published: novasInformacoes.published })
            };

            this.postData.editarPost(indicePost, postModificado);
            return "post foi modificado com sucesso";
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    //exercicio 6 (deleta post)
    excluirPost = (postId: number, usuarioId: number): string => {
        try {
            const indicePost = this.postData.localizarIndicePorId(postId);
            if (indicePost === -1) {
                throw new Error("Post não foi localizado");
            }

            const postParaExcluir = posts[indicePost];

            const usuarioAtual = this.userBusiness.consultarPorId(usuarioId);
            
            const podeExcluir = postParaExcluir.authorId === usuarioId || usuarioAtual.role === "admin";
            if (!podeExcluir) {
                throw new Error("voce não tem permissão para excluir este post");
            }

            this.postData.excluirPost(indicePost);
            return "post foi excluido com sucesso";
        }catch (erro: any) {
            throw new Error(erro.message);
        }
    }
}
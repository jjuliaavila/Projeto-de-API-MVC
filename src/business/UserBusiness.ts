import { User } from "../types";
import { users, obterProximoIdUsuario } from "../bd";
import { PostData } from "../data/PostData";
import { UserData } from "../data/UserData";

export class UserBusiness {
  userData = new UserData();
  verificarUsuario = (email: string) => {
    try {
      if (!email || email.trim() === "") {
        throw new Error("Email é obrigatório");
      }

      const usuarioEncontrado = this.userData.consultarUsuarioPorEmail(email);
        if (!usuarioEncontrado) {
          throw new Error("Usuário não existe no sistema");
        }

        return usuarioEncontrado;
      }catch (erro: any) {
        throw new Error(erro.message);
      }
    }

  listarUsuarios = (): User[] => {
    try {
      return this.userData.listarTodosUsuarios();
      }catch (erro: any) {
        throw new Error(erro.message);     
      }
    }

  registrarUsuario = (dadosUsuario: User): User => {
    try {
      if (dadosUsuario.name) dadosUsuario.name = dadosUsuario.name.trim();
      if (dadosUsuario.email) dadosUsuario.email = dadosUsuario.email.trim().toLowerCase();

      if (!dadosUsuario.name || !dadosUsuario.email || !dadosUsuario.role || !dadosUsuario.age) {
        throw new Error("todos os campos são obrigatorios");
      }

      if (dadosUsuario.role !== "user" && dadosUsuario.role !== "admin") {
        throw new Error("role deve ser 'user' ou 'admin'");
      }

      const emailJaExiste = users.some(u => u.email === dadosUsuario.email);
      if (emailJaExiste) {
      throw new Error("Esse email já está sendo usado");
      }

      const novoId = obterProximoIdUsuario();
      const usuarioCompleto: User = {
        ...dadosUsuario,
        id: novoId
      };

      this.userData.inserirUsuario(usuarioCompleto);
      return usuarioCompleto;
      }catch (erro: any) {
        throw new Error(erro.message);
      }
    }

  //exercicio 1 (busca usuario por id))
  consultarPorId = (identificador: number): User => {
  try {
    if (!identificador || identificador <= 0) {
      throw new Error("ID deve ser um numero positivo");
    }

    const usuario = this.userData.localizarUsuarioPorId(identificador);
    if (!usuario) {
      throw new Error("usuario não foi encontrado");
    }

    return usuario;
    }catch (erro: any) {
      throw new Error(erro.message);
    }
  }

  //exercicio 2 (busca usuarios por idade)
  buscarPorFaixaIdade = (idadeMin: number, idadeMax: number): User[] => {
    try {
      if (isNaN(idadeMin) || isNaN(idadeMax)) {
        throw new Error("idade deve ser numeros validos");
      }
      if (idadeMin < 0 || idadeMax < 0) {
        throw new Error("idade não pode ser negativa");
      }
      if (idadeMin > idadeMax) {
        throw new Error("idade mínima deve ser menor ou igual a maxima");
      }

      const resultados = this.userData.filtrarUsuariosPorIdade(idadeMin, idadeMax);
      return resultados;
      } catch (erro: any) {
        throw new Error(erro.message);
      }
    }

  // exercicio 4 (atualiza usuario)
  atualizarUsuarioCompleto = (id: number, nome: string, email: string, role: string, idade: number): string => {
    try {
      if (!nome || !email || !role || !idade) {
        throw new Error("todos os campos devem ser preenchidos");
      }
            
      if (role !== "user" && role !== "admin") {
        throw new Error("role invalido");
      }

      const indice = this.userData.encontrarIndicePorId(id);
      if (indice === -1) {
        throw new Error("usuario não localizado");
      }

      const emailDuplicado = users.some(u => u.email === email && u.id !== id);
        if (emailDuplicado) {
          throw new Error("email ja esta em uso por outro usuario");
        }

        const usuarioAtualizado: User = {
          id,
          name: nome.trim(),
          email: email.trim().toLowerCase(),
          role: role as 'user' | 'admin',
          age: idade
        };

        this.userData.modificarUsuario(indice, usuarioAtualizado);
        return "usuario foi atualizado com sucesso";
        }catch (erro: any) {
          throw new Error(erro.message);
        }
    }

  // exercicio 7 (remove usuario que nao possui posts)
  removerUsuariosInativos = (confirmacao: boolean): User[] => {
    try {
      if (!confirmacao) {
        throw new Error("eh necessario confirmar a operacao");
      }

      const postData = new PostData();
      const listaPosts = postData.obterTodosOsPosts();

      const idsComPost = listaPosts.map(post => post.authorId);
            
      const usuariosParaRemover = users.filter(usuario => {
        const temPost = idsComPost.includes(usuario.id);
        const ehAdmin = usuario.role === "admin";
        return !temPost && !ehAdmin;
      });

      if (usuariosParaRemover.length === 0) {
        throw new Error("nao ha usuarios inativos pra remover");
      }

      usuariosParaRemover.forEach(usuario => {
        const indice = this.userData.encontrarIndicePorId(usuario.id);
          if (indice !== -1) {
            this.userData.removerUsuarioPorIndice(indice);
        }
      });

      return usuariosParaRemover;
      }catch (erro: any) {
        throw new Error(erro.message);
      }
    }
}
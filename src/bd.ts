import { User, Post } from "./types";

export const users: User[] = [
    {id: 1, name: "Flávio", email: "flavio@flavio.com", role: "admin", age: 30},
    { id: 2, name: "Júlia", email: "julia@email.com", role: "user", age: 19 },
    { id: 3, name: "Gabriela", email: "gabriela@email.com", role: "admin", age: 22 }
]

export const posts: Post[] = [
    {
        id: 1,
        title: "Cachorrinho",
        content: "Cachorros fofos",
        authorId: 1,
        createdAt: new Date("2025-09-24"),
        published: true,
    }
];

let proximoIdUsuario = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
let proximoIdPost = posts.length > 0 ? Math.max(...posts.map(p => p.id)) : 0;

export const obterProximoIdUsuario = (): number => {
    proximoIdUsuario++;
    return proximoIdUsuario;
};

export const obterProximoIdPost = (): number => {
    proximoIdPost++;
    return proximoIdPost;
};

//business: regras de negocio(validacoes)
//controller: pega a requisicao, chama a regra de negocio(business) e devolve a resposta
//data: camada que se comunica com o banco de dados
//routes: define os "caminhos"(endpoints) da aplicacao
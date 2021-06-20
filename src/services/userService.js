import http from "./http";

class UserService {
  async login(data) {
    const { nivelAcesso, id } = (await http.post("usuario/login", data)).data;
    const pessoa = (await http.get(`pessoa/usuario/${id}`)).data;

    return { ...pessoa, nivelAcesso };
  }
}

export default new UserService();

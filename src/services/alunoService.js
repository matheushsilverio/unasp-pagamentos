import BaseService from "./baseService";
import { PessoaService, UsuariosService } from "./api";

class AlunoService {
  constructor() {
    this.alunoService = new BaseService("aluno");
  }

  list() {
    return this.alunoService.list();
  }
  create(data) {
    const {
      ra,
      idCurso,
      idResponsavel,
      email,
      senha,
      nivelAcesso,
      ...personData
    } = data;
    UsuariosService.create({ email, senha, nivelAcesso }).then(
      (userCreated) => {
        const { id: idUsuario } = userCreated.data;

        PessoaService.create({ ...personData, idUsuario }).then(
          (personCreated) => {
            const { id: idPessoa } = personCreated.data;

            this.alunoService.create({ ra, idCurso, idResponsavel, idPessoa });
          }
        );
      }
    );
  }
}

export default new AlunoService();

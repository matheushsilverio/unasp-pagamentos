import http from "./http.js";

export default class BaseService {
  constructor(ref) {
    this.ref = ref;
  }

  list() {
    return http.get(`${this.ref}/listar`);
  }
  create(data) {
    return http.post(`${this.ref}/novo`, data);
  }
  update(data) {
    return http.post(`${this.ref}/editar`, data);
  }
  getById(id) {
    return http.get(`${this.ref}/${id}`);
  }
  getDynamic(route) {
    return http.get(`${this.ref}/${route}`);
  }
}

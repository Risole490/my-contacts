// Este arquivo é responsável por fazer a comunicação com a API para gerenciar as categorias
import CategoryMapper from "./mappers/CategoryMapper";
import HttpClient from "./utils/HttpClient";

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories() {
    const categories = await this.httpClient.get(`/categories`);

    return categories.map(CategoryMapper.toDomain);
  }
}

export default new CategoriesService();

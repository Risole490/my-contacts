class CategoryMapper {
  toDomain(persistenceCategory) {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name,
    };
  }

  // toPersistence(domainCategory) {} >> CRUD de categorias depois
}

export default new CategoryMapper();

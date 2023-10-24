import { Category } from "../../entities/Category";
import { CategoriesRepository } from "../../repositories/implements/CategoriesRepository";

class ListCategoriesUseCase {

    constructor(private categoriesRepository: CategoriesRepository){}

    async execute(): Promise<Category[]>{
        const categories = await this.categoriesRepository.list()
    
        return categories
    }

}

export {ListCategoriesUseCase}
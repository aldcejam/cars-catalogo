import { Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "../ISpecificationsRepository";
import { AppDataSource } from "../../../../database";

class SpecificationRepository implements ISpecificationsRepository {
  private specifications: Repository<Specification>;
 
  constructor() {
    this.specifications = AppDataSource.getRepository(Specification);
  }
  
  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.specifications.create({
      name,
      description,
    });

    await this.specifications.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.specifications.findOne({ where: { name } });

    return specification;
  }

  async list(): Promise<Specification[]> {
    return this.specifications.find();
  }
}

export { SpecificationRepository };

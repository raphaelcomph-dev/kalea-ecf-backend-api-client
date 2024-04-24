import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerModel } from "../../models/customer.model";
import { Repository } from "typeorm";
import { CustomerUserModel } from "../../models/customer-user.model";

@Injectable()
export class CustomerRepository {
    constructor(
        @InjectRepository(CustomerModel) private readonly typeormRepository: Repository<CustomerModel>,
        @InjectRepository(CustomerUserModel)
        private readonly customerUserModelTypeormRepository: Repository<CustomerUserModel>,
    ) {}

    async findById(id: number): Promise<CustomerModel> {
        return this.typeormRepository.findOneBy({ id });
    }

    async findByUserId(id: number): Promise<CustomerModel> {
        const customerUser = await this.customerUserModelTypeormRepository.findOneBy({ userId: id });
        if (customerUser) {
            return this.typeormRepository.findOneBy({ id: customerUser.customerId });
        }
        return null;
    }

    async findAll(): Promise<CustomerModel[]> {
        return this.typeormRepository.find();
    }
}

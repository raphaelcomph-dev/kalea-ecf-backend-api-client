import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserModel } from "../../models/user.model";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(UserModel) private readonly typeormRepository: Repository<UserModel>) {}

    async findByUserNameOrEmail(username: string, email: string): Promise<UserModel> {
        return this.typeormRepository.findOne({
            where: [{ email }, { username }],
        });
    }

    async findAll(): Promise<UserModel[]> {
        return this.typeormRepository.find();
    }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EcfFileProcessInfoModel } from "../../models/ecf-file-processing-info.model";
import { Repository } from "typeorm";
import { ApiContext } from "../../../shared/api-context";

@Injectable()
export class EcfFileProcessInfoRepository {
    constructor(
        @InjectRepository(EcfFileProcessInfoModel)
        private readonly typeormRepository: Repository<EcfFileProcessInfoModel>,
    ) {}

    findAll(): Promise<EcfFileProcessInfoModel[]> {
        return this.typeormRepository.findBy({ userId: ApiContext.getContext().userId });
    }

    async save(ecfFile: EcfFileProcessInfoModel): Promise<void> {
        await this.typeormRepository.save(ecfFile);
    }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EcfFileProcessInfoModel } from "../../models/ecf-file-processing-info.model";
import { Repository } from "typeorm";
import { ApiContext } from "../../../shared/api-context.middleware";

@Injectable()
export class EcfFileProcessInfoRepository {
    constructor(
        @InjectRepository(EcfFileProcessInfoModel)
        private readonly typeormRepository: Repository<EcfFileProcessInfoModel>,
    ) {}

    findAll(): Promise<EcfFileProcessInfoModel[]> {
        return this.typeormRepository.findBy({ userId: ApiContext.getContext().userId });
    }

    findByEcfInfoId(ecfInfoId: number): Promise<EcfFileProcessInfoModel> {
        return this.typeormRepository.findOneBy({ id: ecfInfoId });
    }

    async delete(ecfFileInfoId: number): Promise<void> {
        await this.typeormRepository.delete({ id: ecfFileInfoId });
    }

    async save(ecfFile: EcfFileProcessInfoModel): Promise<void> {
        await this.typeormRepository.save(ecfFile);
    }
}

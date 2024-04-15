import { Injectable } from "@nestjs/common";
import { EcfListItemOutputDto } from "../api/rest/dtos/output/ecf-list-item.output.dto";
import { EcfFileRepository } from "./infra/repositories/ecf-file.repository";
import { ListAllEcfUsecase } from "./usecases/list-all-ecf.usecase";
import { UploadEcfUseCase } from "./usecases/upload-ecf.usecase";
import { EcfFileProcessInfoRepository } from "./infra/repositories/ecf-file-processing-info.repository";

@Injectable()
export class EcfService {
    constructor(
        private readonly ecfFileRepository: EcfFileRepository,
        private readonly ecfFileProcessInfoRepository: EcfFileProcessInfoRepository,
    ) {}

    async uploadEcfFile(file: Express.Multer.File): Promise<void> {
        await new UploadEcfUseCase(this.ecfFileRepository, this.ecfFileProcessInfoRepository).execute(file);
    }

    async findAll(): Promise<EcfListItemOutputDto[]> {
        return new ListAllEcfUsecase(this.ecfFileRepository, this.ecfFileProcessInfoRepository).execute();
    }
}

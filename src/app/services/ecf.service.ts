import { Injectable } from "@nestjs/common";
import { EcfIndicatorsOutputDto } from "../api/rest/dtos/output/ecf-indicators.output.dto";
import { EcfListItemOutputDto } from "../api/rest/dtos/output/ecf-list-item.output.dto";
import { BalanceRepository } from "./infra/repositories/balance.repository";
import { EcfFileProcessInfoRepository } from "./infra/repositories/ecf-file-processing-info.repository";
import { EcfFileRepository } from "./infra/repositories/ecf-file.repository";
import { FindIndicatorsUseCase } from "./usecases/find-indicators.usecase";
import { ListAllEcfUsecase } from "./usecases/list-all-ecf.usecase";
import { UploadEcfUseCase } from "./usecases/upload-ecf.usecase";
import { DeleteEcfUseCase } from "./usecases/delete-ecf.usecase";

@Injectable()
export class EcfService {
    constructor(
        private readonly ecfFileRepository: EcfFileRepository,
        private readonly ecfFileProcessInfoRepository: EcfFileProcessInfoRepository,
        private readonly balanceRepository: BalanceRepository,
    ) {}

    async uploadEcfFile(file: Express.Multer.File): Promise<void> {
        await new UploadEcfUseCase(this.ecfFileRepository, this.ecfFileProcessInfoRepository).execute(file);
    }

    async findAll(): Promise<EcfListItemOutputDto[]> {
        return new ListAllEcfUsecase(this.ecfFileRepository, this.ecfFileProcessInfoRepository).execute();
    }

    async findIndicatorsByEcfInfoId(ecfInfoId: number): Promise<EcfIndicatorsOutputDto> {
        return new FindIndicatorsUseCase(this.balanceRepository).execute(ecfInfoId);
    }

    async delete(fileInfoId: number): Promise<void> {
        return new DeleteEcfUseCase(
            this.ecfFileRepository,
            this.ecfFileProcessInfoRepository,
            this.balanceRepository,
        ).execute(fileInfoId);
    }
}

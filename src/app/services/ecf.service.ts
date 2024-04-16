import { Injectable } from "@nestjs/common";
import { EcfListItemOutputDto } from "../api/rest/dtos/output/ecf-list-item.output.dto";
import { EcfFileRepository } from "./infra/repositories/ecf-file.repository";
import { ListAllEcfUsecase } from "./usecases/list-all-ecf.usecase";
import { UploadEcfUseCase } from "./usecases/upload-ecf.usecase";
import { EcfFileProcessInfoRepository } from "./infra/repositories/ecf-file-processing-info.repository";
import { EcfIndicatorsOutputDto } from "../api/rest/dtos/output/ecf-indicators.output.dto";
import { BalanceRepository } from "./infra/repositories/balance.repository";
import { FindIndicatorsUseCase } from "./usecases/find-indicators.usecase";

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
}

import { ApiContext } from "../../shared/api-context";
import { EcfFileProcessInfoRepository } from "../infra/repositories/ecf-file-processing-info.repository";
import { EcfFileRepository } from "../infra/repositories/ecf-file.repository";
import { EcfFileProcessInfoModel } from "../models/ecf-file-processing-info.model";
import { EcfFileModel } from "../models/ecf-file.model";

export class UploadEcfUseCase {
    constructor(
        private readonly ecfFileRepository: EcfFileRepository,
        private readonly ecfFileProcessInfoRepository: EcfFileProcessInfoRepository,
    ) {}

    async execute(file: Express.Multer.File) {
        const processingInfo = new EcfFileProcessInfoModel({
            userId: ApiContext.getContext().userId,
            state: 0,
            type: 2,
            customerId: ApiContext.getContext().customerId,
            fileName: file.originalname,
            fileSize: file.size,
        });

        await this.ecfFileProcessInfoRepository.save(processingInfo);

        const ecfFile = new EcfFileModel({
            fileBuffer: file.buffer,
        });
        ecfFile.processingInfo = processingInfo;

        await this.ecfFileRepository.save(ecfFile);
    }
}

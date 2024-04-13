import { Injectable } from "@nestjs/common";
import { UploadEcfUsecase } from "./usecases/upload-efc.usecase";
import { EcfFileModel } from "./models/efc-file.model";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class EcfService {
    constructor(
        @InjectRepository(EcfFileModel)
        private readonly ecfFileRepository: Repository<EcfFileModel>,
    ) {}

    async uploadEcfFile(file: Express.Multer.File): Promise<void> {
        const ecfFile = new EcfFileModel({
            fileName: file.originalname,
            fileSize: file.size,
            fileBuffer: file.buffer,
        });

        await this.ecfFileRepository.save(ecfFile);
    }
}

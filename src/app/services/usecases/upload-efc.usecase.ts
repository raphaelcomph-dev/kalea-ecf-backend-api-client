import { Logger } from "@nestjs/common";
import { EcfFileModel } from "../models/efc-file.model";

export class UploadEcfUsecase {
    private readonly logger = new Logger(UploadEcfUsecase.name);
    constructor() {}

    async execute(file: Express.Multer.File) {
        new EcfFileModel({
            fileName: file.originalname,
            fileSize: file.size.toString(),
            fileBuffer: file.buffer.toString("base64"),
        });
    }
}

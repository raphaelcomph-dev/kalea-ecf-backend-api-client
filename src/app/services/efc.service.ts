import { Injectable } from "@nestjs/common";
import { UploadEcfUsecase } from "./usecases/upload-efc.usecase";

@Injectable()
export class EcfService {
    uploadEcfFile(file: Express.Multer.File): void {
        new UploadEcfUsecase().execute(file);
    }
}

import { Controller, Logger, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { EcfService } from "../../services/efc.service";

@Controller("ecf")
export class EcfController {
    private readonly logger = new Logger(EcfController.name);

    constructor(private readonly ecfService: EcfService) {}

    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        this.logger.log(`recebendo requisição upload do ecf:`);
        console.log(file);
        this.ecfService.uploadEcfFile(file);
    }
}

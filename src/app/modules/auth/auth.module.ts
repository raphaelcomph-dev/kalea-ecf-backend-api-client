import { Module } from "@nestjs/common";
import { AuthController } from "./api/auth.controller";
import { AuthService } from "./services/auth.service";
import { UserRepository } from "./services/infra/repositories/user.repository";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "./services/models/user.model";
import { CustomerModel } from "./services/models/customer.model";
import { CustomerUserModel } from "./services/models/customer-user.model";
import { CustomerRepository } from "./services/infra/repositories/customer.repository";
import { NotificationModule } from "../notification/notification.module";

@Module({
    exports: [JwtModule.register({})],
    imports: [
        JwtModule.register({}),
        TypeOrmModule.forFeature([UserModel, CustomerUserModel, CustomerModel]),
        NotificationModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, UserRepository, CustomerRepository],
})
export class AuthModule {}

import { UserModule } from './../user/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CommonModule } from 'src/common/common.module';
import { AuthService } from './auth.service';

@Module({
  //forward ref to avoid circular dependencies
  imports: [forwardRef(() => UserModule), CommonModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

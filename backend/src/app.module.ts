import { CacheModule, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RegistryModule } from './registry/registry.module';

@Module({
  imports: [
    AuthModule, 
    RegistryModule, 
    CacheModule.register({ isGlobal: true, })],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { CacheModule, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FhirModule } from './fhir/fhir.module';
import { RegistryModule } from './registry/registry.module';

@Module({
  imports: [
    AuthModule,
    RegistryModule,
    FhirModule,
    CacheModule.register({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { CacheModule, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FhirModule } from './fhir/fhir.module';
import { RegistryModule } from './registry/registry.module';
import { ClinicalDataModule } from './clinical-data/clinical-data.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    RegistryModule,
    FhirModule,
    CacheModule.register({ isGlobal: true }),
    ClinicalDataModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

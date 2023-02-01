import { Module } from '@nestjs/common';
import { FhirService } from 'src/fhir/fhir.service';
import { RegistryService } from 'src/registry/registry.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, RegistryService, FhirService],
})
export class AuthModule {}

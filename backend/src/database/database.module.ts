// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     MongooseModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         uri: configService.get('database.uri'),
//       }),
//     }),
//   ],
// })
// export class DatabaseModule {} 

// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     ConfigModule,

//     // CENTRAL DATABASE
//     MongooseModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],

//       useFactory: (configService: ConfigService) => ({
//         uri: configService.get<string>('database.uri'),
//       }),
//     }),
//   ],

//   exports: [
//     MongooseModule,
//   ],
// })
// export class DatabaseModule {} 
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TenantDatabaseService } from './tenant-database.service';

@Module({
  imports: [
    ConfigModule,

    // Central database
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
    }),
  ],

  providers: [
    TenantDatabaseService,
  ],

  exports: [
    MongooseModule,
    TenantDatabaseService,
  ],
})
export class DatabaseModule {}
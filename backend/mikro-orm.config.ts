import { Options, SqliteDriver } from '@mikro-orm/sqlite';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
  driver: SqliteDriver,
  dbName: 'sqlite.db',
  metadataProvider: TsMorphMetadataProvider,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations'
  },
  debug: true,
};

export default config;
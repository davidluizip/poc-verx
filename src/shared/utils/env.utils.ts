import { existsSync } from 'fs';
import { join } from 'path';

export function getEnvFilePath(): string | undefined {
  const envFilePath = join(process.cwd(), '.env');

  if (process.env.NODE_ENV === 'dev') {
    return existsSync(envFilePath) ? envFilePath : undefined;
  }

  return undefined;
}

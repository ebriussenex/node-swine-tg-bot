import { GenericContainer, StartedTestContainer, TestContainer } from 'testcontainers';
import { Client } from 'pg';
export async function generatePgClientWithTestContainer(): Promise<Client> {
  const container: TestContainer = await GenericContainer.fromDockerfile(__dirname + '/..').build();

  const testContainer: StartedTestContainer = await container
    .withEnv('POSTGRES_USER', 'sample')
    .withEnv('POSTGRES_PASSWORD', 'sample')
    .withEnv('POSTGRES_DB', 'sample_db')
    .withExposedPorts(5432)
    .start();
  const client = new Client({
    user: 'sample',
    password: 'sample',
    database: 'sample_db',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    host: testContainer.getHost(),
    port: testContainer.getMappedPort(5432),
  });

  await client.connect();

  return client;
}

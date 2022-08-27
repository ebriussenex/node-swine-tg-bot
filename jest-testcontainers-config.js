module.exports = {
    postgre: {
      image: 'postgres',
      tag: '14.3-alpine',
      ports: [5432],
      env: {
        POSTGRES_PASSWORD: 'integration-pass',
      },
      wait: {
        type: 'text',
        text: 'server started',
      },
    },
  };
const { app } = require('@azure/functions');
const { TableClient, AzureNamedKeyCredential } = require('@azure/data-tables');

const account = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const tableName = "VisitorCount";

// Connect to Table Storage
const credential = new AzureNamedKeyCredential(account, accountKey);
const client = new TableClient(
  `https://${account}.table.core.windows.net`,
  tableName,
  credential
);

app.http('visitorCounter', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (req, ctx) => {
    const partitionKey = "Site";
    const rowKey = "Counter";

    try {
      let entity = await client.getEntity(partitionKey, rowKey);
      entity.count = entity.count + 1;

      await client.updateEntity(entity, "Replace");

      return {
        status: 200,
        jsonBody: { count: entity.count }
      };
    } catch (err) {
      if (err.statusCode === 404) {
        const entity = {
          partitionKey,
          rowKey,
          count: 1
        };

        await client.createEntity(entity);

        return {
          status: 200,
          jsonBody: { count: 1 }
        };
      }
      throw err;
    }
  }
});

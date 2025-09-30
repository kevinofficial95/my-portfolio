const { app } = require('@azure/functions');
const { TableClient, AzureNamedKeyCredential } = require('@azure/data-tables');

const account = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const tableName = "VisitorCount";

app.http('visitorCounter', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (req, ctx) => {
    ctx.log(`VisitorCounter function started`);
    ctx.log(`Account: ${account}`);
    ctx.log(`Table: ${tableName}`);

    try {
      const credential = new AzureNamedKeyCredential(account, accountKey);
      const client = new TableClient(
        `https://${account}.table.core.windows.net`,
        tableName,
        credential
      );

      const partitionKey = "Site";
      const rowKey = "Counter";

      try {
        // Try to get existing entity
        let entity = await client.getEntity(partitionKey, rowKey);
        ctx.log(`Current count: ${entity.count}`);
        entity.count = entity.count + 1;

        await client.updateEntity(entity, "Replace");
        ctx.log(`Updated count: ${entity.count}`);

        return {
          status: 200,
          jsonBody: { count: entity.count }
        };
      } catch (err) {
        if (err.statusCode === 404) {
          ctx.log(`Entity not found, creating new one`);
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
        ctx.log.error(`Error fetching entity: ${err.message}`);
        throw err;
      }
    } catch (err) {
      ctx.log.error(`Function error: ${err.message}`);
      return {
        status: 500,
        body: `VisitorCounter function failed: ${err.message}`
      };
    }
  }
});

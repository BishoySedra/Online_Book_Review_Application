import { sequelize } from "../../config/connection.js";

/**
 * Drop and recreate all tables that have been registered with the sequelize
 * instance at the time of the call.  Fast with SQLite in-memory (~ms).
 * Calling this in beforeEach to get a perfectly clean slate for every test.
 */
export async function resetDb() {
    await sequelize.sync({ force: true });
}

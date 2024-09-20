import { openDatabaseSync ,openDatabaseAsync} from "expo-sqlite"
import { drizzle } from "drizzle-orm/expo-sqlite"

export const expo = openDatabaseSync("my2.db")
const db = drizzle(expo)

export default db

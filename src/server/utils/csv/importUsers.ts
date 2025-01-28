// lib/importUsers.ts
import { readFile } from "fs/promises";
import path from "path";
import { parseUserCSV } from "./csvParser";
import { UserImportService } from "./userImporter";
import { ImportResult } from "./types";

export async function importUsersFromLocalCSV(): Promise<ImportResult> {
  try {
    // Read the CSV file from public directory
    const filePath = path.join(process.cwd(), "public", "data", "users.csv");
    const fileContent = await readFile(filePath);

    // Parse CSV
    const { data, errors } = await parseUserCSV(fileContent);

    // If there are parsing errors, return them
    if (errors.length > 0) {
      return {
        success: false,
        message: "CSV parsing failed",
        errors,
      };
    }

    // Import users
    const importService = new UserImportService();
    return await importService.importUsers(data);
  } catch (error) {
    console.error("Import error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

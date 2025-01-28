import { db } from "@ssms/lib/drizzle";
import { CSVUser, ImportResult, ValidationError } from "./types";
// import { generateRandomString } from "better-auth/crypto";
import { user } from "@ssms/server/db/schemas/auth";
import { inArray } from "drizzle-orm";
import { auth } from "@ssms/lib/auth";

export class UserImportService {
  private async validateUniqueEmails(users: CSVUser[]): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    const emailSet = new Set<string>();

    // Check for duplicates within CSV
    users.forEach((user, index) => {
      if (emailSet.has(user.email)) {
        errors.push({
          row: index + 2,
          message: `Duplicate email in CSV: ${user.email}`,
        });
      }
      emailSet.add(user.email);
    });

    // Check for existing emails in database
    const existingEmails = await db
      .select({ email: user.email })
      .from(user)
      .where(inArray(user.email, Array.from(emailSet)));

    existingEmails.forEach(({ email }) => {
      errors.push({
        row: users.findIndex((u) => u.email === email) + 2,
        message: `Email already exists in database: ${email}`,
      });
    });

    return errors;
  }

  public async importUsers(users: CSVUser[]): Promise<ImportResult> {
    try {
      // Validate unique emails
      const emailErrors = await this.validateUniqueEmails(users);
      if (emailErrors.length > 0) {
        return {
          success: false,
          message: "Email validation failed",
          errors: emailErrors,
        };
      }

      // Transform CSV data to database format
      const usersToInsert = users.map(async (userData) => {
        await auth.api.signUpEmail({
          body: {
            //id: generateRandomString(28, "a-z", "A-Z", "0-9"),
            name: userData.name,
            email: userData.email,
            password: userData.password,
            //emailVerified: false,
            //image: userData.image ?? null,
            position: userData.position ?? null,
            role: userData.role ?? "user",
            office: userData.office,
            // Only set the department_id if it's provided and not empty
            department: userData.department || null,
            division: userData.division || null,
            //createdAt: new Date(),
            //updatedAt: new Date(),
          },
        });
      });

      // usersToInsert.map(async (user) => {
      //   await auth.api.signUpEmail({
      //     body: user,
      //   });
      // });

      // Perform bulk insert
      // await db.insert(user).values(usersToInsert);
      //await auth.api.signUpEmail(usersToInsert)

      console.log(usersToInsert);

      return {
        success: true,
        message: "Users imported successfully",
        importedCount: usersToInsert.length,
      };
    } catch (error) {
      console.error("User import failed:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }
}

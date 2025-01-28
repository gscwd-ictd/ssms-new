// csvParser.ts
import Papa from "papaparse";
import { CSVUser, CSVUserSchema, CSVParseResult, ValidationError } from "./types";
import { z } from "zod";

export class CSVParsingError extends Error {
  constructor(public errors: ValidationError[]) {
    super("CSV parsing failed");
    this.name = "CSVParsingError";
  }
}

export const parseUserCSV = async (file: Buffer): Promise<CSVParseResult> => {
  return new Promise((resolve, reject) => {
    const validatedData: CSVUser[] = [];
    const errors: ValidationError[] = [];

    Papa.parse(file.toString(), {
      header: true,
      skipEmptyLines: "greedy",
      transformHeader: (header: string) => header.trim(),
      transform: (value: string) => {
        // Transform empty strings to null
        if (value === "" || value === undefined) {
          return null;
        }
        return value.trim();
      },
      complete: (results) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        results.data.forEach((row: any, index: number) => {
          try {
            // Transform the row data
            const transformedRow = {
              ...row,
              position: row.position || null,
              department: row.department || null,
              division: row.division || null,
              image: row.image || null,
            };

            const validatedRow = CSVUserSchema.parse(transformedRow);
            validatedData.push(validatedRow);
          } catch (error) {
            if (error instanceof z.ZodError) {
              error.errors.forEach((err) => {
                errors.push({
                  row: index + 2,
                  message: `${err.path.join(".")}: ${err.message}`,
                });
              });
            }
          }
        });

        resolve({ data: validatedData, errors });
      },
      error: (error: { message: unknown }) => {
        reject(new Error(`CSV parsing failed: ${error.message}`));
      },
    });
  });
};

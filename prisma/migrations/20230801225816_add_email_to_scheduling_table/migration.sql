/*
  Warnings:

  - Added the required column `email` to the `schedulings` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_schedulings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "observations" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "schedulings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_schedulings" ("created_at", "date", "id", "name", "observations", "user_id") SELECT "created_at", "date", "id", "name", "observations", "user_id" FROM "schedulings";
DROP TABLE "schedulings";
ALTER TABLE "new_schedulings" RENAME TO "schedulings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

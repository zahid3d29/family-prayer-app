import fs from "fs";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const sql = fs.readFileSync(
  "./if0_40893281_family_prayer_quran.sql",
  "utf8"
);

const insertRegex =
  /INSERT INTO `[^`]+`[\s\S]*?VALUES\s*([\s\S]*?);/g;

const monthMap = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const users = new Map();
const assignments = [];

let match;

while ((match = insertRegex.exec(sql)) !== null) {
  const valuesBlock = match[1];

  const rowRegex =
    /\((\d+),\s*'([^']*)',\s*'?(\d+)'?,\s*'([^']*)'(?:,\s*'[^']*')?,\s*'([^']*)',\s*'?(\d{4})'?\)/g;

  let row;

  while ((row = rowRegex.exec(valuesBlock)) !== null) {
    const name = row[2].trim();
    const phone = row[3].trim();
    const paras = row[4].trim();
    const monthName = row[5].trim();
    const year = Number(row[6]);

    const month =
      monthMap[monthName];

    if (!month) continue;

    const userKey = phone;

    if (!users.has(userKey)) {
      users.set(userKey, {
        name,
        phone,
      });
    }

    paras
      .split(",")
      .map((p) => p.trim())
      .forEach((para) => {
        assignments.push({
          phone,
          para_number: Number(para),
          month,
          year,
        });
      });
  }
}

console.log(
  "Users found:",
  users.size
);

console.log(
  "Assignments found:",
  assignments.length
);

const userMap = new Map();

for (const user of users.values()) {
  const { data, error } =
    await supabase
      .from("users")
      .insert(user)
      .select()
      .single();

  if (error) {
    console.error(error);
    continue;
  }

  userMap.set(
    user.phone,
    data.id
  );
}

for (const assignment of assignments) {
  const userId =
    userMap.get(
      assignment.phone
    );

  if (!userId) continue;

  const { error } =
    await supabase
      .from("assignments")
      .insert({
        user_id: userId,
        para_number:
          assignment.para_number,
        month:
          assignment.month,
        year:
          assignment.year,
      });

  if (error) {
    console.log(error.message);
  }
}

console.log(
  "Migration complete"
);
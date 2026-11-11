import { test } from "node:test";
import assert from "node:assert/strict";
import { schema } from "../app/components/signUpForm/schema.ts";

const valid = {
  username: "batman",
  password: "secret123",
  firstname: "Ali",
  lastname: "Zaki",
  address: "Bandar",
  phoneNumber: "09129994567",
};

test("phone validation is stable across repeated submissions", () => {
  for (let i = 0; i < 5; i++) {
    assert.equal(schema.safeParse(valid).success, true, `attempt ${i + 1}`);
  }
});

test("phone validation accepts Iranian mobile formats", () => {
  for (const phoneNumber of ["09129994567", "9129994567", "+989129994567"]) {
    assert.equal(schema.safeParse({ ...valid, phoneNumber }).success, true, phoneNumber);
  }
});

test("phone validation rejects junk around a valid number", () => {
  // All but the last two were accepted by the previous unanchored regex.
  for (const phoneNumber of ["abc09129994567xyz", "hello 09129994567", "091299945678", "0912999456", "hello"]) {
    assert.equal(schema.safeParse({ ...valid, phoneNumber }).success, false, phoneNumber);
  }
});

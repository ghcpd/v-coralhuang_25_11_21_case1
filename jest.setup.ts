import "@testing-library/jest-dom";

if (!(global as any).crypto) {
  const { randomUUID } = require("crypto") as { randomUUID: () => string };
  (global as any).crypto = { randomUUID };
}

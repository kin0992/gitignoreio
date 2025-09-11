import { type Mock } from 'vitest';

export const makeMockResponse = (statusCode: number, textMock: Mock) => ({
  ok: statusCode === 200,
  status: statusCode,
  text: textMock,
});

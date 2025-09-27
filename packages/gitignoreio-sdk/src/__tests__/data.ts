import { mock } from 'vitest-mock-extended';

import type { HttpClient } from '../domain/http-client';

export const makeMockHttpClient = () => mock<HttpClient>();

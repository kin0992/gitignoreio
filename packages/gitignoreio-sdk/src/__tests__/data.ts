import { mock } from 'vitest-mock-extended';

import type { HttpClient } from '../domain';

export const makeMockHttpClient = () => mock<HttpClient>();

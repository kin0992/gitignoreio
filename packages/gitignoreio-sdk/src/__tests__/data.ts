import { mock } from 'vitest-mock-extended';

import type { HttpClient } from '../types.js';

export const makeMockHttpClient = () => mock<HttpClient>();

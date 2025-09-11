import { mock } from 'vitest-mock-extended';

import { HttpClient } from '../types.js';

export const makeMockHttpClient = () => mock<HttpClient>();

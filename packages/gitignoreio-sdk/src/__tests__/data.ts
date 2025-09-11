import { mock } from 'vitest-mock-extended';

import { HttpClient } from '../types';

export const makeMockHttpClient = () => mock<HttpClient>();

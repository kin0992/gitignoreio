import {mock} from "vitest-mock-extended";
import {HttpClient} from "../src/types";

export const makeMockHttpClient = () => mock<HttpClient>();
import MockAdapter from "axios-mock-adapter";
import api from "services/api";
import TestUtils from "react-dom/test-utils";
import { client } from "services/apiTheGraph";

const mockApi = new MockAdapter(api);

export type mockRequestProps = {
  payload?: any;
  status?: number;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
};

const requestByType = (method: string, url: string) => {
  const requestsObject: Record<string, any> = {
    GET: mockApi.onGet(url),
    POST: mockApi.onPost(url),
    PATCH: mockApi.onPatch(url),
    PUT: mockApi.onPut(url),
    DELETE: mockApi.onDelete(url),
  };

  return requestsObject[method];
};
export const mockRequest = (
  url: string,
  { payload, status = 200, method = "GET" }: mockRequestProps,
) => {
  const request = requestByType(method, url);
  request.reply(status, payload);
};

export const changeInputValue = (element: any, value: any) => {
  /* eslint-disable no-param-reassign */
  element.value = value;
  element.selectionStart = value.length;
  element.selectionEnd = value.length;
  /* eslint-enable no-param-reassign */

  TestUtils.Simulate.change(element);
};

type MockGraphqlOptions = {
  loading?: boolean;
  networkStatus?: number;
};
export const mockGraphqlRequest = (
  queryName: string,
  responseData: any,
  { loading = false, networkStatus = 1 }: MockGraphqlOptions = {},
) => {
  const querySpy = jest.spyOn(client, "query");

  return querySpy.mockImplementationOnce((queryArg): any => {
    const queryNameFromArgs = (queryArg.query.definitions[0] as any).name
      ?.value;

    if (queryNameFromArgs === queryName) {
      return Promise.resolve({
        loading,
        networkStatus,
        data: responseData,
      });
    }

    return null;
  });
};

export const mockEnv = (envVars: Record<any, any>) => {
  const INITIAL_ENV = process.env;

  beforeEach(() => {
    process.env = {
      ...INITIAL_ENV,
      ...envVars,
    };
  });

  afterAll(() => {
    process.env = INITIAL_ENV;
  });
};

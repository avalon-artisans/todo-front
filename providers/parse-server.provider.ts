interface ParseServerConfig {
  serverUrl: string;
  applicationId: string;
  restApiKey: string;
}

export const parseServerConfig: ParseServerConfig = {
  serverUrl: process.env.PARSE_SERVER_URL as string,
  applicationId: process.env.PARSE_APPLICATION_ID as string,
  restApiKey: process.env.PARSE_REST_API_KEY as string,
};

export type { ParseServerConfig };
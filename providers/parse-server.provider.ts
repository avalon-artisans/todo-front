interface ParseServerConfig {
  applicationId: string;
  restApiKey: string;
}

export const parseServerConfig: ParseServerConfig = {
  applicationId: process.env.PARSE_APPLICATION_ID as string,
  restApiKey: process.env.PARSE_REST_API_KEY as string,
};

export type { ParseServerConfig };
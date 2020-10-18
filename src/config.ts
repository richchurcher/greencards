export interface ClientConfig {
  apiUrl: string;
  categoryApiUrl: string;
  maxQuestions: number;
}

export const getConfig = (): ClientConfig => {
  const config: ClientConfig = {
    apiUrl: process.env.REACT_APP_API_URL!,
    categoryApiUrl: process.env.REACT_APP_CATEGORY_API_URL!,
    maxQuestions: Number(process.env.REACT_APP_MAX_QUESTIONS!),
  };

  for (const [k, v] of Object.entries(config)) {
    if (v === undefined) {
      throw new Error(`${k} must be defined.`);
    }
  }

  return config;
};

export default getConfig();

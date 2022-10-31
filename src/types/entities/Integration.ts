import IntegrationTask from "./IntegrationTask";


export default interface Integration {
  id: number;
  name: string;
  walletAddress: string;
  url: string;
  logo: string;
  created_at?: string;
  updated_at?: string;
  integrationTask: IntegrationTask;
}

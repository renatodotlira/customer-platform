
export interface IEvolutionRepository {
  createInstance(instanceName: string);
  connectInstance(instanceName: string);
  disconnectInstance(instanceName: string);
}
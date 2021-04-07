import State from '@core/state';

class ListStatesService {
  async execute(): Promise<State[]> {
    try {
      const states = await State.findAll({ where: { active: true }, attributes: ['name', 'id'] });

      return states;
    } catch (err) {
      return [];
    }
  }
}

export { ListStatesService };

import State from '@core/address-state';

class ListStatesService {
  async execute(): Promise<State[]> {
    try {
      const states = await statesRepository.find({ where: { active: true }, select: ['name', 'id'] });

      return states;
    } catch (err) {
      return [];
    }
  }
}

export { ListStatesService };

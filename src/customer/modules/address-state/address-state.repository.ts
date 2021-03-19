import { EntityRepository, Repository } from 'typeorm';

import AddressState from '@core/address-state';

@EntityRepository(AddressState)
export class AddressStateRepository extends Repository<AddressState> {}

import { Cat } from 'src/entities/cat.entity';
import { REPOSITORY } from 'src/utilities/enums';

export const catsProviders = [
  {
    provide: REPOSITORY.CATS_REPOSITORY,
    useValue: Cat,
  },
];

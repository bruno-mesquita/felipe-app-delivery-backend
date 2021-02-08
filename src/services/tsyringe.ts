import { container } from 'tsyringe';
import { resolve } from 'path';
import { importClassesFromDirectories } from 'routing-controllers/util/importClassesFromDirectories';

const repoPath = resolve(
  __dirname,
  '..',
  'application',
  'repositories',
  '**',
  '*.repository.{js,ts}'
);
const useCasePath = resolve(
  __dirname,
  '..',
  'application',
  'use-cases',
  '**',
  '*.use-case.{js,ts}'
);

const repos = importClassesFromDirectories([repoPath]);
const useCases = importClassesFromDirectories([useCasePath]);

repos.forEach((Repo: any) => container.register(Repo.name, Repo));

useCases.forEach((UseCase: any) => container.register(UseCase.name, UseCase));

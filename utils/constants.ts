import { faker } from '@faker-js/faker';


export const TEST_CREDENTIALS = {
  VALID_EMAIL: 'john.shand06@gmail.com',
  VALID_PASSWORD: process.env.VALID_PASSWORD || '',
  USER_NAME: 'John S',
  INVALID_EMAIL: faker.internet.email(),
  INVALID_PASSWORD: faker.internet.password(),
  MALFORMED_EMAIL: 'broken.com',
};

export const CI_CONFIG = {
  IS_CI: !!process.env.CI,
  HEADLESS: process.env.CI ? true : false,
  WORKERS: process.env.CI ? 1 : undefined,
};

export const HUDL_URLS = {
  HOME: 'https://www.hudl.com',
  AUTH: 'https://identity.hudl.com/u/login/identifier?state='
};

export const TIMEOUTS = {
  DEFAULT: 10000,
  LONG: 15000,
  SHORT: 3000
};


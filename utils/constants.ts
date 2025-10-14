import { faker } from '@faker-js/faker';

export const TEST_CREDENTIALS = {
  VALID_EMAIL: 'john.shand06@gmail.com',
  VALID_PASSWORD: process.env.VALID_PASSWORD || '',
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

export const HUDL_APPLICATIONS = {
  hudl: {
    name: 'Hudl',
    selector: '[data-qa-id="login-hudl"]',
    id: 'login-hudl'
  },
  wyscout: {
    name: 'Wyscout',
    selector: '[data-qa-id="login-wyscout"]',
    id: 'login-wyscout'
  },
  volleymetrics: {
    name: 'Volleymetrics',
    selector: '[data-qa-id="login-volleymetrics"]',
    id: 'login-volleymetrics'
  },
  signal: {
    name: 'Signal',
    selector: '[data-qa-id="login-signal"]',
    id: 'login-signal'
  },
  statsbomb: {
    name: 'Statsbomb',
    selector: '[data-qa-id="login-statsbomb"]',
    id: 'login-statsbomb'
  },
  instatBasketball: {
    name: 'Instat for Basketball',
    selector: '[data-qa-id="login-instatbasketball"]',
    id: 'login-instatbasketball'
  },
  instatHockey: {
    name: 'Instat for Ice Hockey',
    selector: '[data-qa-id="login-instathockey"]',
    id: 'login-instathockey'
  },
  iqAmericanFootball: {
    name: 'IQ for American Football',
    selector: '[data-qa-id="login-iq"]',
    id: 'login-iq'
  },
  balltime: {
    name: 'Balltime',
    selector: '[data-qa-id="login-balltime"]',
    id: 'login-balltime'
  },
  titan: {
    name: 'Titan',
    selector: '[data-qa-id="login-titan"]',
    id: 'login-titan'
  },
  fastScout: {
    name: 'FastScout',
    selector: '[data-qa-id="login-fastscout"]',
    id: 'login-fastscout'
  },
} as const;

export const LOGIN_SELECTORS = {
  inputs: {
    email: 'input[name="username"], #username',
    password: 'input[name="password"], #password'
  },
  buttons: {
    continue: 'Continue'
  },
  errorMessages: {
    malformedEmail: 'Enter a valid email.',
    missingEmail: 'Enter an email address',
    missingPassword: 'Enter your password.',
    invalidEmail: 'Incorrect username or password.',
    invalidPassword: 'Your email or password is incorrect. Try again.'
  },
  links: {
    forgotPassword: 'Forgot Password'
  }
} as const;
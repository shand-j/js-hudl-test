import { HUDL_APPLICATIONS, LOGIN_SELECTORS } from '../utils/constants';

// Automatically derived types from constants - no manual maintenance needed
export type ApplicationKey = keyof typeof HUDL_APPLICATIONS;
export type ApplicationName = (typeof HUDL_APPLICATIONS)[ApplicationKey]['name'];
export type ApplicationId = (typeof HUDL_APPLICATIONS)[ApplicationKey]['id'];
export type ApplicationSelector = (typeof HUDL_APPLICATIONS)[ApplicationKey]['selector'];

export type LoginInputKey = keyof typeof LOGIN_SELECTORS.inputs;
export type LoginButtonKey = keyof typeof LOGIN_SELECTORS.buttons;
export type LoginErrorKey = keyof typeof LOGIN_SELECTORS.errorMessages;
export type LoginLinkKey = keyof typeof LOGIN_SELECTORS.links;

export type LoginInputSelector = (typeof LOGIN_SELECTORS.inputs)[LoginInputKey];
export type LoginButtonText = (typeof LOGIN_SELECTORS.buttons)[LoginButtonKey];
export type LoginErrorText = (typeof LOGIN_SELECTORS.errorMessages)[LoginErrorKey];
export type LoginLinkText = (typeof LOGIN_SELECTORS.links)[LoginLinkKey];
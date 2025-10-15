# Hudl Login Test Automation

A Playwright TypeScript test suite for automated testing of Hudl's login functionality.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npm run install:browser
   ```

3. Set environment variable for valid password:
   ```bash
   export VALID_PASSWORD="your_test_password"
   ```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run tests on single browser (Chromium only)
npm run test:dev
```

## Test Coverage
Primary focus is that Users can access hudl and bad actors cannot.

- **Successful Login**: Valid credentials allow user authentication
- **Invalid Credentials**: Invalid email/password combinations show appropriate errors

I chose to validate the form elements for completeness, in reality these would be unit/ integration/ component tests.
- **Field Validation**: Empty fields trigger validation messages

In a test environment I would want to test the full password reset journey. Not suitable in production.
- **UI Elements**: Forgot password links and form interactions

## Architecture

- **Page Object Model**: Organised page classes with type-safe locators
- **TypeScript**: Full type safety for test constants and selectors
- **Cross-browser**: Tests run on Chromium, Firefox, and Chrome
- **CI/CD Ready**: Configured for GitHub Actions
- **Playwright fixtures**: Simplifies the use of pages in tests, resulting in cleaner test code.

## Reports

View test results:
```bash
npm run report:html
```

## Configuration

- Tests configured for multiple browsers in `playwright.config.ts`
- Type-safe constants in `utils/constants.ts`
- Page objects in `pages/` directory

## Validation & Quality Assurance

```bash
# Type checking
npx tsc --noEmit
```
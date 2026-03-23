import { config as baseConfig } from './wdio.base.js';
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  ...baseConfig,

  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  hostname: 'hub.browserstack.com',
  port: 443,
  path: '/wd/hub',
  protocol: 'https',

  services: [
    ['browserstack', {
      browserstackLocal: false,
      opts: {
        logFile: 'logs/browserstack.log',
      },
    }]
  ],

  capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'Samsung Galaxy S23',
    'appium:platformVersion': '13.0',
    'appium:automationName': 'UiAutomator2',
    // App sample oficial de BrowserStack
    'appium:app': 'bs://520195122a6b1e520bc9d8529f303a6b8254eead',
    'bstack:options': {
      projectName: 'Appium BrowserStack Challenge',
      buildName: 'Challenge Build 1',
      sessionName: 'Android Happy Path Tests',
      debug: true,
      networkLogs: true,
    },
  }],
};
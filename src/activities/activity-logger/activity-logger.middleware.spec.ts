import { ActivityLoggerMiddleware } from './activity-logger.middleware';

describe('ActivityLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new ActivityLoggerMiddleware()).toBeDefined();
  });
});

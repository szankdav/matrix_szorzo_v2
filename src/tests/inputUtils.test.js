import { askQuestion, askRange, askRowAndColumn } from "../utils/inputUtils";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

describe('Matrix Input Functions', () => {
  let mockReadline;
  let mockInterface;

  beforeEach(() => {
    // Create fresh mocks for each test
    mockInterface = {
      question: vi.fn(),
      close: vi.fn()
    };

    mockReadline = {
      createInterface: vi.fn().mockReturnValue(mockInterface)
    };

    // Mock the entire readline module
    vi.mock('readline', () => mockReadline);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('askQuestion', () => {
    it('should resolve with a valid positive number', (done) => {
      // Set up the mock behavior
      mockInterface.question.mockImplementation((question, callback) => {
        // Simulate async behavior
        process.nextTick(() => callback('5'));
      });

      // Call the function and make assertions
      askQuestion('Enter a number: ')
        .then(result => {
          expect(result).toBe(5);
          expect(mockInterface.close).toHaveBeenCalled();
          done();
        })
        .catch(done);
    });
  });
});
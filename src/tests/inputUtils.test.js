import { askNumber, askRange, askRowAndColumn, askQuestionForContinue } from "../utils/inputUtils";
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

  describe('askNumber', () => {
    it('should resolve with a valid positive number', (done) => {
      // Set up the mock behavior
      mockInterface.question.mockImplementation((question, callback) => {
        // Simulate async behavior
        process.nextTick(() => callback('5'));
      });

      // Call the function and make assertions
      askNumber('Enter a number: ')
        .then(result => {
          expect(result).toBe(5);
          expect(mockInterface.close).toHaveBeenCalled();
          done();
        })
        .catch(done);
    });

    it('should log an error on console for invalid input', (done) => {
      // Set up the mock behavior
      mockInterface.question.mockImplementation((question, callback) => {
        process.nextTick(() => callback('invalid'));
        process.nextTick(() => callback('5'));
      });

      askNumber('Enter a number: ')
        .then(result => {
          expect(mockInterface.question).toHaveBeenCalled(2);
          done();
        })
        .catch(done);
    });

    it('should log an error on console for negative input', (done) => {
      // Set up the mock behavior
      mockInterface.question.mockImplementation((question, callback) => {
        process.nextTick(() => callback('-5'));
        process.nextTick(() => callback('5'));
      });

      askNumber('Enter a number: ')
        .then(result => {
          expect(mockInterface.question).toHaveBeenCalled(2);
          done();
        })
        .catch(done);
    });
  });

  describe('askRange', () => {
    it('should resolve with a valid range', (done) => {
      mockInterface.question.mockImplementation((question, callback) => {
        process.nextTick(() => callback('5 10'));
      });

      askRange()
        .then(result => {
          expect(result).toEqual({ min: 5, max: 10 });
          expect(mockInterface.close).toHaveBeenCalled();
          done();
        })
        .catch(done);
    });

    it('should log an error on console for invalid input', (done) => {
      mockInterface.question.mockImplementation((question, callback) => {
        process.nextTick(() => callback('invalid'));
        process.nextTick(() => callback('5 10'));
      });

      askRange()
        .then(result => {
          expect(mockInterface.question).toHaveBeenCalled(2);
          done();
        })
        .catch(done);
    });

    it('should log an error on console for negative input', (done) => {
      mockInterface.question.mockImplementation((question, callback) => {
        process.nextTick(() => callback('-5 10'));
        process.nextTick(() => callback('5 10'));
      });

      askRange()
        .then(result => {
          expect(mockInterface.question).toHaveBeenCalled(2);
          done();
        })
        .catch(done);
    });
  });

  describe('askRowAndColumn', () => {
    // Create a sample matrix for testing
    const testMatrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];  // 3x3 matrix
  
    it('should resolve with valid row and column numbers', (done) => {
      mockInterface.question.mockImplementation((question, callback) => {
        process.nextTick(() => callback('2 2'));  // Valid input within matrix bounds
      });
  
      askRowAndColumn(testMatrix)
        .then(result => {
          expect(result).toEqual([2, 2]);
          expect(mockInterface.close).toHaveBeenCalled();
          done();
        })
        .catch(done);
    });
  
    it('should ask again if wrong number of inputs provided', (done) => {
      mockInterface.question
        .mockImplementationOnce((question, callback) => {
          process.nextTick(() => callback('2'));  // Only one number
        })
        .mockImplementationOnce((question, callback) => {
          process.nextTick(() => callback('2 2')); // Valid input
        });
  
      askRowAndColumn(testMatrix)
        .then(result => {
          expect(mockInterface.question).toHaveBeenCalledTimes(2);
          expect(result).toEqual([2, 2]);
          done();
        })
        .catch(done);
    });
  
    it('should ask again if non-numeric input provided', (done) => {
      mockInterface.question
        .mockImplementationOnce((question, callback) => {
          process.nextTick(() => callback('a b'));  // Non-numeric input
        })
        .mockImplementationOnce((question, callback) => {
          process.nextTick(() => callback('2 2')); // Valid input
        });
  
      askRowAndColumn(testMatrix)
        .then(result => {
          expect(mockInterface.question).toHaveBeenCalledTimes(2);
          expect(result).toEqual([2, 2]);
          done();
        })
        .catch(done);
    });
  
    it('should ask again if non-positive numbers provided', (done) => {
      mockInterface.question
        .mockImplementationOnce((question, callback) => {
          process.nextTick(() => callback('0 1'));  // Zero is not allowed
        })
        .mockImplementationOnce((question, callback) => {
          process.nextTick(() => callback('2 2')); // Valid input
        });
  
      askRowAndColumn(testMatrix)
        .then(result => {
          expect(mockInterface.question).toHaveBeenCalledTimes(2);
          expect(result).toEqual([2, 2]);
          done();
        })
        .catch(done);
    });
  
    it('should ask again if numbers are outside matrix bounds', (done) => {
      mockInterface.question
        .mockImplementationOnce((question, callback) => {
          process.nextTick(() => callback('4 4'));  // Outside 3x3 matrix bounds
        })
        .mockImplementationOnce((question, callback) => {
          process.nextTick(() => callback('2 2')); // Valid input
        });
  
      askRowAndColumn(testMatrix)
        .then(result => {
          expect(mockInterface.question).toHaveBeenCalledTimes(2);
          expect(result).toEqual([2, 2]);
          done();
        })
        .catch(done);
    });
  
    // Test console.log messages (optional)
    it('should log appropriate error messages', (done) => {
      const consoleSpy = vi.spyOn(console, 'log');
      
      mockInterface.question
        .mockImplementationOnce((question, callback) => {
          process.nextTick(() => callback('4 4'));  // Outside bounds
        })
        .mockImplementationOnce((question, callback) => {
          process.nextTick(() => callback('2 2')); // Valid input
        });
  
      askRowAndColumn(testMatrix)
        .then(() => {
          expect(consoleSpy).toHaveBeenCalledWith(
            "A sor és oszlop számoknak a mátrix határain belül kell lennie!"
          );
          consoleSpy.mockRestore();
          done();
        })
        .catch(done);
    });
  });

  describe('askQuestionForContinue', () => {
    it('should resolve with true for "i"', () => {
      mockInterface.question.mockImplementation((question, callback) => {
        process.nextTick(() => callback('i'));
      });

      askQuestionForContinue("Szeretne még módosítani a mátrixon? (i/n): ")
        .then(result => {
          expect(result).toBe(true);
          done();
        });
    });

    it('should resolve with false for "n"', () => {
      mockInterface.question.mockImplementation((question, callback) => {
        process.nextTick(() => callback('n'));
      });

      askQuestionForContinue("Szeretne még módosítani a mátrixon? (i/n): ")
        .then(result => {
          expect(result).toBe(false);
          done();
        });
    });

    it('should log an error on console for invalid input', (done) => {
      mockInterface.question.mockImplementation((question, callback) => {
        process.nextTick(() => callback('x'));
        process.nextTick(() => callback('n'));
      });

      askQuestionForContinue("Szeretne még módosítani a mátrixon? (i/n): ")
        .then(result => {
          expect(mockInterface.question).toHaveBeenCalled(2);
          done();
        });
    });
  });
});
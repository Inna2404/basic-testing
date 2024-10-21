// Uncomment the code below and write your tests
import { random } from 'lodash';
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1000);
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(500);
    expect(() => account.withdraw(600)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const accountFrom = getBankAccount(500);
    const accountTo = getBankAccount(300);
    expect(() => accountFrom.transfer(600, accountTo)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(500);
    expect(() => account.transfer(100, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(500);
    account.deposit(200);
    expect(account.getBalance()).toBe(700);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(500);
    account.withdraw(200);
    expect(account.getBalance()).toBe(300);
  });

  test('should transfer money', () => {
    const accountFrom = getBankAccount(500);
    const accountTo = getBankAccount(300);
    accountFrom.transfer(200, accountTo);
    expect(accountFrom.getBalance()).toBe(300);
    expect(accountTo.getBalance()).toBe(500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValueOnce(50).mockReturnValueOnce(1);
    const account = getBankAccount(500);
    const balance = await account.fetchBalance();
    expect(balance).toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock).mockReturnValueOnce(75).mockReturnValueOnce(1);
    const account = getBankAccount(500);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(75);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockReturnValueOnce(1).mockReturnValueOnce(1);
    const account = getBankAccount(500);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});

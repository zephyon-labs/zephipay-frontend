import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { AccountProvider, useAccount } from "@/state/account-provider";
import { beforeEach, describe, expect, it } from "vitest";

function wrapper({ children }: { children: ReactNode }) {
  return <AccountProvider>{children}</AccountProvider>;
}

describe("AccountProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("starts with a zero balance", async () => {
    const { result } = renderHook(() => useAccount(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isReady).toBe(true);
    });

    expect(result.current.account.balances.availableUsd).toBe(0);
    expect(result.current.account.balances.usdc).toBe(0);
  });

  it("adds funds and keeps USD and USDC synchronized", async () => {
    const { result } = renderHook(() => useAccount(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isReady).toBe(true);
    });

    act(() => {
      result.current.addFunds(25.5);
    });

    expect(result.current.account.balances.availableUsd).toBe(25.5);
    expect(result.current.account.balances.usdc).toBe(25.5);
  });

  it("subtracts funds when sufficient balance exists", async () => {
    const { result } = renderHook(() => useAccount(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isReady).toBe(true);
    });

    act(() => {
      result.current.addFunds(50);
    });

    let succeeded = false;

    act(() => {
      succeeded = result.current.subtractFunds(20);
    });

    expect(succeeded).toBe(true);
    expect(result.current.account.balances.availableUsd).toBe(30);
    expect(result.current.account.balances.usdc).toBe(30);
  });

  it("rejects overdrafts and preserves the balance", async () => {
    const { result } = renderHook(() => useAccount(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isReady).toBe(true);
    });

    act(() => {
      result.current.addFunds(10);
    });

    let succeeded = true;

    act(() => {
      succeeded = result.current.subtractFunds(15);
    });

    expect(succeeded).toBe(false);
    expect(result.current.account.balances.availableUsd).toBe(10);
    expect(result.current.account.balances.usdc).toBe(10);
  });

  it("normalizes negative additions to zero", async () => {
    const { result } = renderHook(() => useAccount(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isReady).toBe(true);
    });

    act(() => {
      result.current.addFunds(-100);
    });

    expect(result.current.account.balances.availableUsd).toBe(0);
    expect(result.current.account.balances.usdc).toBe(0);
  });

  it("resets the account to its initial state", async () => {
    const { result } = renderHook(() => useAccount(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isReady).toBe(true);
    });

    act(() => {
      result.current.addFunds(42);
    });

    act(() => {
      result.current.resetAccount();
    });

    expect(result.current.account.balances.availableUsd).toBe(0);
    expect(result.current.account.balances.usdc).toBe(0);
    expect(result.current.account.balances.sol).toBe(0);
    expect(result.current.account.balances.zera).toBeNull();
  });
});
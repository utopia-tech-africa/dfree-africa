"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DonationFrequency = "one-time" | "monthly";

const PRESET_AMOUNTS = [25, 50, 100, 250, 500] as const;
const POPULAR_AMOUNT = 50;

export function DonationForm() {
  const [frequency, setFrequency] = useState<DonationFrequency>("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(
    POPULAR_AMOUNT,
  );
  const [customAmount, setCustomAmount] = useState("");

  return (
    <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-xl sm:rounded-[2.5rem] md:min-w-8/10 md:max-w-lg md:p-8">
      <div className="mb-6 flex rounded-lg bg-neutral-200 p-1">
        <button
          type="button"
          onClick={() => setFrequency("one-time")}
          className={cn(
            "flex-1 rounded-lg px-4 py-2.5 text-sm  transition-colors cursor-pointer",
            frequency === "one-time"
              ? "bg-primary-500 text-white"
              : "text-black hover:bg-neutral-300",
          )}
        >
          One Time
        </button>
        <button
          type="button"
          onClick={() => setFrequency("monthly")}
          className={cn(
            "flex-1 rounded-lg px-4 py-2.5 text-sm transition-colors cursor-pointer",
            frequency === "monthly"
              ? "bg-primary-500 text-white"
              : "text-black hover:bg-neutral-300",
          )}
        >
          Monthly
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {PRESET_AMOUNTS.map((amount) => {
          const isSelected = selectedAmount === amount;
          const isPopular = amount === POPULAR_AMOUNT;

          return (
            <button
              key={amount}
              type="button"
              onClick={() => setSelectedAmount(amount)}
              className={cn(
                "relative rounded-xl border px-3 py-4 text-base md:text-lg font-semibold transition-colors cursor-pointer",
                isSelected
                  ? "border-primary-400 border-2 bg-[#A1FD4533] text-primary-500"
                  : "border-primary-300 bg-white text-neutral-900 hover:border-neutral-400",
              )}
            >
              {isPopular && (
                <span className="absolute -top-2.5 right-2 rounded bg-primary-500 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  Popular
                </span>
              )}
              ${amount}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setSelectedAmount("custom")}
          className={cn(
            "rounded-xl border px-3 py-4 text-base md:text-lg  font-semibold transition-colors cursor-pointer",
            selectedAmount === "custom"
              ? "border-primary-300 border-2 bg-[#A1FD4533] text-primary-500/90"
              : "border-primary-300 bg-white text-neutral-900 hover:border-neutral-400",
          )}
        >
          Custom
        </button>
      </div>

      {selectedAmount === "custom" && (
        <div className="mt-4">
          <label htmlFor="custom-amount" className="sr-only">
            Custom donation amount
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
              $
            </span>
            <input
              id="custom-amount"
              type="number"
              min="1"
              placeholder="Enter amount"
              value={customAmount}
              onChange={(event) => setCustomAmount(event.target.value)}
              className="w-full rounded-xl border border-neutral-300 py-3 pl-8 pr-4 text-base outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        </div>
      )}

      <Button className="mt-6 w-full py-6 text-base font-medium" size="lg">
        Donate to the cause
      </Button>
    </div>
  );
}

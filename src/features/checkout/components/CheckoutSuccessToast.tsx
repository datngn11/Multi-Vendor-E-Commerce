"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export const CheckoutSuccessToast = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast.success("Payment successful!", {
        duration: 5000,
      });

      // Clean up the URL
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("success");

      router.replace(`/?${newParams.toString()}`, { scroll: false });
    }
  }, [searchParams, router]);

  return null;
};

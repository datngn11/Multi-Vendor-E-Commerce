"use client";

import { useQuery } from "@tanstack/react-query";

import { Author } from "@/shared/components/author";
import { useTRPC } from "@/trpc/client";

interface IProps {
  tenantSlug?: string;
}

export const TenantNavbar = ({ tenantSlug }: IProps) => {
  const trpc = useTRPC();

  const { data: tenant } = useQuery(
    trpc.tenants.getBySlug.queryOptions({
      slug: tenantSlug,
    })
  );

  if (!tenantSlug) return null;

  return (
    <div className="bg-body-background flex h-20 items-center border-b px-6 lg:px-12">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between">
        {tenant && (
          <Author
            avatar={tenant.image?.url}
            className="no-underline"
            name={tenant.name}
            size="lg"
            tenantSlug={tenantSlug}
          />
        )}
      </div>
    </div>
  );
};

export const TenantNavbarSkeleton = () => {
  return (
    <div className="bg-body-background flex h-20 items-center border-b px-6">
      <div className="flex animate-pulse items-center gap-2">
        <div className="bg-background h-12 w-12 rounded-full" />
        <div className="flex flex-col">
          <div className="bg-background h-4 w-32 rounded" />
          <div className="bg-background h-4 w-24 rounded" />
        </div>
      </div>
    </div>
  );
};

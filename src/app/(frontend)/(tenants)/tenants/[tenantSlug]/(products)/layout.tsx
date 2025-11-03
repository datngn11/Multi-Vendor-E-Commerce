import { Suspense } from "react";

import {
  TenantNavbar,
  TenantNavbarSkeleton,
} from "@/features/tenants/components/TenantNavbar";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

const TenantPageLayout = async ({
  children,
  params,
}: LayoutProps<"/tenants/[tenantSlug]">) => {
  const { tenantSlug } = await params;

  prefetch(
    trpc.tenants.getBySlug.queryOptions({
      slug: tenantSlug,
    })
  );

  return (
    <HydrateClient>
      <div className="bg-background flex min-h-screen flex-col">
        <Suspense fallback={<TenantNavbarSkeleton />}>
          <TenantNavbar tenantSlug={tenantSlug} />
        </Suspense>

        <div className="flex-1">
          <div className="mx-auto max-w-(--breakpoint-xl)">{children}</div>
        </div>
      </div>
    </HydrateClient>
  );
};

export default TenantPageLayout;

import Link from "next/link";

const TenantLayout = ({ children }: LayoutProps<"/tenants">) => {
  return (
    <>
      {children}

      <div className="bg-body-background border-t p-4 lg:p-12">
        Powered by{" "}
        <Link className="text-2xl font-semibold tracking-wider" href="/">
          VELÉLS
        </Link>
      </div>
    </>
  );
};

export default TenantLayout;

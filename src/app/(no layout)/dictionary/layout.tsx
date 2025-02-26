import BreadcrumbMenu from "@/app/ui/breadcrumbs/breadcrumb 1/breadcrumb";
import BreadcrumbMenu2 from "@/app/ui/breadcrumbs/breadcrumb 2/breadcrumb";
import BreadcrumbMenu3 from "@/app/ui/breadcrumbs/breadcrumb 3/breadcrumb";

export default function DictionaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <BreadcrumbMenu />
      {children}
    </div>
  );
}

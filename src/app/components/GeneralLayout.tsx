import Link from "next/link";
import { FC, ReactNode } from 'react'
import { getLayout as getSiteLayout } from "./SiteLayout";
import { useRouter } from "next/router";

export interface ActiveLinkProps{
  children?: ReactNode,
  href: string,
  className?: String
}

const ActiveLink : FC<ActiveLinkProps> = (props: ActiveLinkProps) => {
  const router = useRouter();
  return (
    <Link href={props.href} scroll={false}>
      <a
        className={`${
          router.pathname === props.href
            ? "text-gray-900 border-gray-800"
            : "text-gray-600 hover:text-gray-700 border-transparent"
        } ${props.className} block pb-4 font-semibold text-sm sm:text-base border-b-2 focus:outline-none focus:text-gray-900 whitespace-no-wrap`}
      >
        {props.children}
      </a>
    </Link>
  );
};

export interface GeneralLayoutProps{
  children?: ReactNode
}

const GeneralLayout : FC<GeneralLayoutProps> = (props: GeneralLayoutProps) => {
  return (
    <div className="max-w-xl mx-auto px-8">
      <h1 className="text-2xl text-gray-900 font-semibold">Account Settings</h1>

      <div
        className="mt-6 flex overflow-x-auto scrollbar-none"
        style={{ boxShadow: "inset 0 -2px 0 #edf2f7" }}
      >
        <ActiveLink href="/account-settings/basic-information">
          Basic Information
        </ActiveLink>

        <ActiveLink href="/account-settings/profile" className="ml-10">
          Profile
        </ActiveLink>

        <ActiveLink href="/account-settings/team-settings" className="ml-10">
          Team Settings
        </ActiveLink>

        <ActiveLink href="/account-settings/billing" className="ml-10">
          Billing
        </ActiveLink>

        <ActiveLink href="/account-settings/notifications" className="ml-10">
          Notifications
        </ActiveLink>

        <ActiveLink href="/account-settings/security" className="ml-10">
          Security
        </ActiveLink>
      </div>

      <div>{props.children}</div>
    </div>
  );
};

export const getLayout = (page : ReactNode) =>
  getSiteLayout(<GeneralLayout>{page}</GeneralLayout>);

export default GeneralLayout;

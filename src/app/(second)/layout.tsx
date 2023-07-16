import { ReactNode } from 'react'
import Navbar from "@/app/components/Navbar";

 

export default function Layout({
        children, 
      }: {
        children: React.ReactNode;
      }) {

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
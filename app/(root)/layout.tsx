import React, { ReactNode } from "react";
import Navbar from "../../components/Navbar";


export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main className='font-works-sans'>
      <Navbar />
      {children}
    </main>
  );
}

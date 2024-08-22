import React from "react";
import {Navbar, NavbarContent, NavbarItem} from "@nextui-org/navbar"
import Link from "next/link";

export default function App() {
  return (
    <Navbar isBordered>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/banks">
            Bank
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/" aria-current="page">
            Credit Card
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

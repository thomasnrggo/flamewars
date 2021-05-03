import React from "react";
import cookie from "../services/cookieService";
import Link from "next/link";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

export default function Layout({ children }) {
  function handleLogOut() {
    cookie.remove("token");
    window.location.href = "/";
  }

  return (
    <Container>
      <header className="header">
        <Navbar expand="lg">
          <Link href="/">
            <a className="navbar-brand">🔥 Flamewars 🔥</a>
          </Link>

          <Nav className="ml-auto">
            <Button onClick={handleLogOut}>Log out</Button>
          </Nav>
        </Navbar>
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        Made with 💚 by{" "}
        <a href="https://juanda.dev/" target="_blank" rel="noreferrer">
          Juan Daniel Martínez
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/thomasnrggo/"
          target="_blank"
          rel="noreferrer"
        >
          Anthony González
        </a>
      </footer>
    </Container>
  );
}

import React from "react";
import Link from "next/link";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

export default function Layout({ children }) {
  return (
    <Container>
      <header className="header">
        <Navbar expand="lg">
          <Link href="/">
            <a className="navbar-brand">🔥 Flamewars 🔥</a>
          </Link>

          <Navbar.Toggle aria-controls="navbar" />

          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              <Link href="/login">
                <a className="nav-link mr-3">Log In</a>
              </Link>

              <Link href="/signin">
                <a>
                  <Button>Sign In</Button>
                </a>
              </Link>
            </Nav>
          </Navbar.Collapse>
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

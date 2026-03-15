"use strict";
(() => {
  // src/main.ts
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.getElementById("loader").classList.add("hidden");
    }, 1800);
  });
  var nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);
  });
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("active", open);
    navToggle.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
  var reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  var observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  reveals.forEach((el) => observer.observe(el));
  var particleContainer = document.getElementById("particles");
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 3 + 1;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-duration:${Math.random() * 15 + 10}s;animation-delay:-${Math.random() * 20}s;opacity:${Math.random() * 0.3 + 0.1}`;
    particleContainer.appendChild(p);
  }
  var stepsLine = document.getElementById("stepsLine");
  if (stepsLine) {
    const stepsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) stepsLine.classList.add("animated");
    }, { threshold: 0.5 });
    stepsObserver.observe(stepsLine);
  }
  var sections = document.querySelectorAll("section[id]");
  var navAnchors = document.querySelectorAll(".nav-links a");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  });
})();

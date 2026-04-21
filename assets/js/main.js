(() => {
  const yearElement = document.getElementById("year")
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString()
  }

  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
  const navCollapseElement = document.getElementById("navMenu")

  if (!navLinks.length || !navCollapseElement) {
    return
  }

  const navCollapse = new bootstrap.Collapse(navCollapseElement, {
    toggle: false
  })

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) {
        navCollapse.hide()
      }
    })
  })

  const revealElements = document.querySelectorAll(".reveal-up")
  if (revealElements.length && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add("is-visible")
          revealObserver.unobserve(entry.target)
        })
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    )

    revealElements.forEach((element) => {
      revealObserver.observe(element)
    })
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible")
    })
  }

  const tiltCards = document.querySelectorAll(".tilt-card")
  if (!tiltCards.length || prefersReducedMotion) {
    return
  }

  const handleCardMove = (event) => {
    const card = event.currentTarget
    const cardBounds = card.getBoundingClientRect()
    const offsetX = event.clientX - cardBounds.left
    const offsetY = event.clientY - cardBounds.top
    const rotateY = ((offsetX / cardBounds.width) - 0.5) * 7
    const rotateX = ((offsetY / cardBounds.height) - 0.5) * -7

    card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`
  }

  const resetCard = (event) => {
    event.currentTarget.style.transform = ""
  }

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", handleCardMove)
    card.addEventListener("mouseleave", resetCard)
    card.addEventListener("blur", resetCard, true)
  })
})()

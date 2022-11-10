<template>
  <div class="layout">
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-light" id="mainNav">
      <div class="container px-4 px-lg-5">
        <a class="navbar-brand" href="index.html">Start Bootstrap</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ms-auto py-4 py-lg-0">
            <li class="nav-item">
              <a class="nav-link px-lg-3 py-3 py-lg-4" href="index.html"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link px-lg-3 py-3 py-lg-4" href="about.html"
                >About</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link px-lg-3 py-3 py-lg-4" href="post.html"
                >Sample Post</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link px-lg-3 py-3 py-lg-4" href="contact.html"
                >Contact</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <slot />

    <!-- Footer-->
    <footer class="border-top">
      <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <ul class="list-inline text-center">
              <li class="list-inline-item">
                <a href="#!">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#!">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#!">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-github fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
            </ul>
            <div class="small text-center text-muted fst-italic">
              Copyright &copy; Your Website 2022
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style></style>

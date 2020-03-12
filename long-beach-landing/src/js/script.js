const buttonPlayVideo = document.querySelector(".play-video");
const bigVideo = document.querySelector(".big-video-player");
const sectionIntro = document.querySelector("body > main > section.intro");
const sectionBlog = document.querySelector(
  "body > main > section.section-blog"
);
const header = document.querySelector("body > header");
const sectionCta = document.querySelector("body > main > section.section-cta");
const menuMobile = document.querySelector(
  "body > header > div > div.nav > div.menu-icon > nav"
);

var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  }
};

buttonPlayVideo.addEventListener("click", e => {
  if (bigVideo.paused) {
    buttonPlayVideo.style.bottom =
      bigVideo.getAttribute("videoHeight") * 0 + "110px";
    buttonPlayVideo.style.left =
      bigVideo.getAttribute("videoWidth") * 0 + "60px";
    bigVideo.play();
    buttonPlayVideo.dataset.play = "false";
    buttonPlayVideo.innerHTML = "";
    buttonPlayVideo.innerHTML = "<i class='fa fa-pause'></i>";
  } else {
    bigVideo.pause();
    buttonPlayVideo.dataset.play = "true";
    buttonPlayVideo.innerHTML = "";
    buttonPlayVideo.innerHTML = "<i class='fa fa-play'></i>";
  }
});

const topNavLinks = document.querySelectorAll("header > div > div.nav a");
const topNavLinksArr = [...topNavLinks];

const ankers = [
  {
    link: "home",
    scrollTo: 0,
    offsetHeight: header.offsetHeight
  },
  {
    link: "about",
    scrollTo: sectionIntro.offsetTop - 100,
    offsetHeight: sectionIntro.offsetHeight
  },
  {
    link: "blog",
    scrollTo: sectionBlog.offsetTop - 100,
    offsetHeight: sectionBlog.offsetHeight
  },
  {
    link: "contact",
    scrollTo: sectionCta.offsetTop - 800,
    offsetHeight: sectionCta.offsetHeight + 400
  }
];

if (isMobile.any()) {
  console.log(isMobile.any());

  document.addEventListener("touchend", e => {
    if (topNavLinksArr.includes(e.target)) {
      topNavLinksArr.map(node => {
        node.classList.remove("active");
      });
      e.target.classList.add("active");

      ankers.map(item => {
        if (e.target.innerHTML.toLowerCase() == item.link) {
          window.scrollTo({ top: item.scrollTo, behavior: "smooth" });
        }
      });
    }

    if (e.target.classList.contains("menu-icon")) {
      e.target.classList.toggle("active-menu-icon");
      menuMobile.classList.toggle("menu-active");
    }
  });
} else {
  document.addEventListener("click", e => {
    event.preventDefault();

    if (topNavLinksArr.includes(e.target)) {
      topNavLinksArr.map(node => {
        node.classList.remove("active");
      });
      e.target.classList.add("active");

      ankers.map(item => {
        if (e.target.innerHTML.toLowerCase() == item.link) {
          window.scrollTo({ top: item.scrollTo, behavior: "smooth" });
        }
      });
    }

    if (e.target.classList.contains("menu-icon")) {
      e.target.classList.toggle("active-menu-icon");
      menuMobile.classList.toggle("menu-active");
    }
  });
}

const nav = document.querySelector("header > .container > .nav ");
const menuDesktop = document.querySelector(
  "body > header > div > div.nav > nav"
);

window.addEventListener("load", e => {
  nav.style.left =
    document.querySelector("body > header > div").offsetLeft + "px";
  nav.style.right =
    document.querySelector("body > header > div").offsetLeft + "px";
});

window.addEventListener("resize", e => {
  nav.style.left =
    document.querySelector("body > header > div").offsetLeft + "px";
  nav.style.right =
    document.querySelector("body > header > div").offsetLeft + "px";
});

window.onscroll = e => {
  if (
    window.pageYOffset >
    document.querySelector("body > header > div > div.brand > h1").offsetTop
  ) {
    if (window.getComputedStyle(menuDesktop).display !== "none") {
      nav.classList.add("fixed");
    } else {
      nav.classList.add("fixed");
    }
  } else {
    nav.classList.remove("fixed");
  }

  ankers.map(anker => {
    const top = anker.scrollTo;
    const bottom = top + anker.offsetHeight;

    if (window.pageYOffset >= top && window.pageYOffset <= bottom) {
      topNavLinksArr.map(link => {
        if (anker.link == link.innerHTML.toLowerCase()) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  });
};

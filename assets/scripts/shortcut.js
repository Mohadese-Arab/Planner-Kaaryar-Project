//---- DOM ----//
const appsSection = document.querySelector(".apps");

//---- shortcuts array ----//
const links = [
  {
    url: "https://digikala.com",
    favicon: "https://www.digikala.com/favicon.ico",
    title : "دیجی کالا"
  },
  {
    url: "https://toplearn.com",
    favicon: "https://www.toplearn.com/favicon.ico",
    title : "تاپ لرن"
  },
  {
    url : "https://kaaryar.ir/",
    favicon : "https://kaaryar.ir/favicon.ico",
    title : "کاریار"
  }
];

//---- print shortcuts----//
const createShortcuts = () => {
  for (let link of links) {
    appsSection.innerHTML += `<div class="item d-flex align-center justify-center">
        <a href="${link.url}">
          <img src="${link.favicon}" alt="">
        </a>
        <span>${link.title}</span>`;
  }

  if (links.length < 11) {
    const numOfBoxes = 11 - links.length;
    for (let i = 0; i < numOfBoxes; i++) {
      appsSection.innerHTML += `<div class="item d-flex align-center justify-center"><i class="fa-solid fa-plus"></i></div>`;
    }
  }
};
createShortcuts();
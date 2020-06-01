const dayContainer = document.querySelector(".js-day");
const dayTitle = dayContainer.querySelector("h1");

function getday() {
  const date = new Date();
  const year = date.getFullYear();
  const months = date.getMonth() + 1;
  const day = date.getDate();
  //   const dayofWeek = date.getDay();
  const dayofWeeks = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = dayofWeeks[new Date(`${year}-${months}-${day}`).getDay()];

  console.log(dayOfWeek);
  

  dayTitle.innerText = `${year}년 ${months}월 ${day}일 ${dayOfWeek}요일`;
}

function init() {
  getday();
}

init();

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"; // 검정
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE; // 캔버스 사이즈 설정
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"; // 초기 white 배경 적용
ctx.fillRect(0, 0, canvas.width, canvas.height); // 좌표 x, y, 크기 가로세로만큼 배경적용
ctx.strokeStyle = INITIAL_COLOR; // 선색적용: 검정
ctx.fillStyle = INITIAL_COLOR; // 배경색
ctx.lineWidth = 2.5; // 선의 두께

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // 같은말 if(painting === false)
    ctx.beginPath(); // 새로운 경로를 지정
    ctx.moveTo(x, y); // x와 y 로 지정된 좌표로 옮긴다
  } else {
    ctx.lineTo(x, y); // x와 y로 지정된 위치까지 선을 그린다
    ctx.stroke(); // 윤곽선 그리기
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "채우기";
  } else {
    filling = true;
    mode.innerText = "그리기";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height); // 좌표 x, y, 크기 가로세로
  }
}

function handleRightClick(event) {
  event.preventDefault();
}

function handleSaveBtn() {
  const image = canvas.toDataURL();
  const link = document.createElement("a"); // a 엘리먼트 생성
  link.href = image; // a엘리먼트에 href로 저장
  link.download = "painting"; // 다운로드 저장이미지 이름
  link.click();
  console.log(link);
}

if (canvas) {
  // canvas에 위치할때 이벤트 생성
  canvas.addEventListener("mousemove", onMouseMove); // 마우스가 이동할때 이벤트발생
  canvas.addEventListener("mousedown", startPainting); // 마우스클릭시 이벤트발생
  canvas.addEventListener("mouseup", stopPainting); // 마우스를 뗄때 이벤트 발생
  canvas.addEventListener("mouseleave", stopPainting); // 마우스가 canvas를 떠날때
  canvas.addEventListener("click", handleCanvasClick); // 배경채우기
  canvas.addEventListener("contextmenu", handleRightClick); // 마우스 우클릭했을때 저장버튼이 안뜨게하기
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
); // colors를 array로 만들고 each문을 돌린다

if (range) {
  range.addEventListener("input", handleRangeChange);
} // input의 값에따라 반응하는 이벤트

if (mode) {
  mode.addEventListener("click", handleModeClick);
} // 클릭에따른 버튼 글자바꾸기

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveBtn);
}

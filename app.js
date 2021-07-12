const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

canvas.width = 700; // 캔버스 사이즈 설정
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"; // 선색적용: 검정
ctx.lineWidth = 2.5; // 선의 두께

let painting = false;

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
}

if (canvas) {
  // canvas에 위치할때 이벤트 생성
  canvas.addEventListener("mousemove", onMouseMove); // 마우스가 이동할때 이벤트발생
  canvas.addEventListener("mousedown", startPainting); // 마우스클릭시 이벤트발생
  canvas.addEventListener("mouseup", stopPainting); // 마우스를 뗄때 이벤트 발생
  canvas.addEventListener("mouseleave", stopPainting); // 마우스가 canvas를 떠날때
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
); // colors를 array로 만들고 each문을 돌린다

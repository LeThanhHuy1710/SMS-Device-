const params = new URLSearchParams(location.search);
const deviceId = params.get("device");

const chatBody = document.getElementById("chatBody");
const header = document.getElementById("header");

let lastData = "";

async function loadSMS(){

  if (!deviceId) {
    chatBody.innerHTML = "<div class='empty'>Không có device</div>";
    return;
  }

  try {

    // lấy sms
    const res = await fetch(
      BASE + "sms?device_id=eq." + deviceId + "&order=created_at.desc",
      { headers: headers() }
    );

    const data = await res.json();

    // tránh reload lại UI
    const json = JSON.stringify(data);
    if (json === lastData) return;
    lastData = json;

    render(data);

  } catch (e){
    console.log("SMS ERROR", e);
  }
}

function render(list){

  chatBody.innerHTML = "";

  if (!list.length) {
    chatBody.innerHTML = "<div class='empty'>Không có tin nhắn</div>";
    return;
  }

  list.forEach(s => {

    const div = document.createElement("div");
    div.className = "msg";

    const time = new Date(s.created_at).toLocaleString();

    div.innerHTML = `
      <div class="sender">📨 ${s.sender}</div>
      <div class="otp">🔢 ${s.otp || "-"}</div>
      <div>${s.content}</div>
      <div class="time">${time}</div>
    `;

    chatBody.appendChild(div);
  });

  // auto scroll xuống cuối
  chatBody.scrollTop = chatBody.scrollHeight;
}

// load lần đầu
loadSMS();

// realtime giả
setInterval(loadSMS, 3000);

let devices = [];

async function load(){
  try {
    const res = await fetch(BASE + "devices?select=*", {
      headers: headers()
    });

    const data = await res.json();

    console.log("DEVICES:", data);

    devices = data || [];

    render();

  } catch (e) {
    console.log("LOAD ERROR", e);
  }
}

function render(){

  const box = document.getElementById("deviceList"); // ✅ FIX
  const count = document.getElementById("count");

  if (!box) return;

  box.innerHTML = "";

  if (count) {
    count.innerText = devices.length + " thiết bị";
  }

  const now = Date.now();

  devices.forEach(d => {

    const last = Number(d.last_seen) || 0;
    const isOnline = (now - last) < 15000;

    const div = document.createElement("div");
    div.className = "device";

    div.innerHTML = `
      <div class="name">${d.device_name || "Unknown"}</div>

      <div class="status">
        ${isOnline ? "🟢 Online" : "🔴 Offline"}
      </div>

      <div class="actions">
        <button class="btn-blue" onclick="openSMS('${d.id}')">Tin nhắn</button>
        <button class="btn-blue" onclick="openInfo('${d.id}')">Thông tin</button>
        <button class="btn-red" onclick="deleteDevice('${d.id}')">Xoá</button>
      </div>
    `;

    box.appendChild(div);
  });
}

function openSMS(id){
  location.href = "pages/sms/sms.html?device=" + id;
}

function openInfo(id){
  location.href = "pages/thongtin/thongtin.html?device=" + id;
}

function deleteDevice(id){
  fetch(BASE + "devices?id=eq." + id, {
    method: "DELETE",
    headers: headers()
  }).then(load);
}

load();
setInterval(load, 5000);

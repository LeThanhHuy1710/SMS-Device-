let devices = [];

async function load(){
  const res = await fetch(BASE + "devices?select=*", {
    headers: headers()
  });

  const data = await res.json();
  devices = data || [];

  render();
}

function render(){
  const box = document.getElementById("list");
  const count = document.getElementById("count");

  box.innerHTML = "";

  count.innerText = devices.length + " thiết bị";

  const now = Date.now();

  devices.forEach(d => {

    const last = Number(d.last_seen) || 0;
    const isOnline = (now - last) < 15000;

    const div = document.createElement("div");
    div.className = "device";

    div.innerHTML = `
      <div class="name">${d.device_name || "Unknown"}</div>

      <div class="status">
        <span class="status-dot ${isOnline ? "online-dot" : "offline-dot"}"></span>
        ${isOnline ? "Online" : "Offline"}
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
  location.href = "pages/sms.html?device=" + id;
}

function openInfo(id){
  location.href = "pages/info.html?device=" + id;
}

function deleteDevice(id){
  fetch(BASE + "devices?id=eq." + id, {
    method: "DELETE",
    headers: headers()
  }).then(load);
}

load();
setInterval(load, 5000);

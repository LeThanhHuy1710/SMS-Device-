const urlParams = new URLSearchParams(window.location.search);
const deviceId = urlParams.get("device");

function goBack(){
  history.back();
}

async function loadInfo(){

  if (!deviceId){
    document.getElementById("infoBox").innerHTML =
      `<div class="loading">Thiếu device id</div>`;
    return;
  }

  try {

    const res = await fetch(
      BASE + "devices?id=eq." + deviceId,
      { headers: headers() }
    );

    const data = await res.json();

    if (!data || data.length === 0){
      document.getElementById("infoBox").innerHTML =
        `<div class="loading">Không có dữ liệu</div>`;
      return;
    }

    render(data[0]);

  } catch (e){
    console.log("ERROR", e);
  }
}

function render(d){

  document.getElementById("infoBox").innerHTML = `
    <div class="card">

      <div class="row">
        <div class="label">📱 Thiết bị</div>
        <div class="value">${d.device_name || "Unknown"}</div>
      </div>

      <div class="row">
        <div class="label">🔋 Pin</div>
        <div class="value">${d.battery ?? "--"}%</div>
      </div>

      <div class="row">
        <div class="label">📡 Nhà mạng</div>
        <div class="value">${d.network || "Unknown"}</div>
      </div>

      <div class="row">
        <div class="label">📍 GPS</div>
        <div class="value">
          ${d.lat ?? 0}, ${d.lng ?? 0}
        </div>
      </div>

      ${
        d.lat && d.lng
        ? `<a class="map" target="_blank"
             href="https://www.google.com/maps?q=${d.lat},${d.lng}">
             🗺 Xem bản đồ
           </a>`
        : ""
      }

    </div>
  `;
}

// load
loadInfo();

// realtime giả
setInterval(loadInfo, 5000);

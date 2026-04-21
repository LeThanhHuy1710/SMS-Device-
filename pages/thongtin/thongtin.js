const urlParams = new URLSearchParams(window.location.search);
const deviceId = urlParams.get("device");

function goBack(){
  history.back();
}

async function loadInfo(){
  try {

    const res = await fetch(
      BASE + "device_info?device_id=eq." + deviceId + "&order=updated_at.desc&limit=1",
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
        <div class="value">${d.brand} ${d.model}</div>
      </div>

      <div class="row">
        <div class="label">🤖 Android</div>
        <div class="value">${d.android_version}</div>
      </div>

      <div class="row">
        <div class="label">🔋 Pin</div>
        <div class="value">${d.battery}%</div>
      </div>

      <div class="row">
        <div class="label">📡 Nhà mạng</div>
        <div class="value">${d.network}</div>
      </div>

      <div class="row">
        <div class="label">📍 GPS</div>
        <div class="value">${d.lat}, ${d.lon}</div>
      </div>

      ${
        d.lat !== "0"
        ? `<a class="map" target="_blank"
             href="https://www.google.com/maps?q=${d.lat},${d.lon}">
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

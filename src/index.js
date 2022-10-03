import L from "leaflet";

const fecthData = async () => {
  const url =
    "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
  const res = await fetch(url);
  const data = await res.json();
  //console.log(data);

  const urlPos =
    "https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f";
  const resPos = await fetch(urlPos);
  const dataPos = await resPos.json();
  //console.log(dataPos)

  const urlNeg =
    "https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e";
  const resNeg = await fetch(urlNeg);
  const dataNeg = await resNeg.json();

  addMap(data, dataPos, dataNeg);
};

const addMap = (data) => {
  let map = L.map("map", {
    minZoom: -3
  });

  let geoJson = L.geoJSON(data, {
    onEachFeature: getFeature
  }).addTo(map);

  let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap"
  }).addTo(map);

  map.fitBounds(geoJson.getBounds());
};

const getFeature = (feature, layer) => {
  //console.log(feature.properties.name) tulostaa kaikki kunnat
  if (!feature.id) return;
  layer.bindPopup(feature.properties.name);
  /*
  `<ul>
      <li>Positive migration: ${dataPos.dataset.dimension.Alue.category.label}</li>
      <li>Negative migration: ${dataNeg.dimension.Alue.category.label}</li>
    </ul>`
  */

  layer.bindTooltip(feature.properties.name);
};

fecthData();

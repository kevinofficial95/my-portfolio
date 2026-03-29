import * as THREE from "three";

const routePoints = [
  new THREE.Vector3(-5.5, -0.95, 16),
  new THREE.Vector3(-2.5, -0.95, 11),
  new THREE.Vector3(2.4, -0.95, 6),
  new THREE.Vector3(5, -0.95, 0),
  new THREE.Vector3(1.8, -0.95, -6),
  new THREE.Vector3(-3.4, -0.95, -12),
  new THREE.Vector3(-5.6, -0.95, -18),
  new THREE.Vector3(-0.5, -0.95, -24),
  new THREE.Vector3(4.5, -0.95, -30),
  new THREE.Vector3(1.5, -0.95, -37),
  new THREE.Vector3(-1.2, -0.95, -44),
];

export function createRouteCurve(): THREE.CatmullRomCurve3 {
  return new THREE.CatmullRomCurve3(routePoints, false, "catmullrom", 0.45);
}

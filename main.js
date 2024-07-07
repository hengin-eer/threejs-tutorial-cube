// 3つの要素が必要
let scene, camera, renderer, texture, cube;
let textureSet = ["blackwood", "egypt", "painting", "stone"];
let i_texture = 0;

function init() {
    // 1. シーン
    scene = new THREE.Scene();
    // 2. カメラ
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    // 3. レンダラー（投影器）
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    // ボックスの設定
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    // const material = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // 一旦マテリアルを消しておく
    texture = new THREE.TextureLoader().load("./textures/blackwood.jpg"); // 黒い木材のテクスチャ
    const material = new THREE.MeshBasicMaterial({ map: texture });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.name = "cube";
    camera.position.z = 5;
}

// アニメーション制御
function animate() {
    requestAnimationFrame(animate); // 何度もアニメーションを繰り返す（再帰構文）

    cube.rotation.x += 0.01; // x軸基準で回転
    cube.rotation.y += 0.01; // y軸基準で回転

    renderer.render(scene, camera);
}

// ウィンドウ変更時のキャンバスサイズの調整
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);

function setNextTexture() {
    if (i_texture+1 < textureSet.length) {
        i_texture += 1;
    } else {
        i_texture = 0;
    }
    const cubeObject = scene.getObjectByName("cube");
    cubeObject.material.map = new THREE.TextureLoader().load(`./textures/${textureSet[i_texture]}.jpg`);
    cubeObject.material.needsUpdate = true;
}

// ボタンを押したときにテクスチャを変更
const nextTextureButton = document.getElementById("nextTextureBtn");
nextTextureButton.addEventListener("click", () => {
    setNextTexture();
});

init(); // 初期設定を呼び出し
animate();

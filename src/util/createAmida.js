// =============================
// 💴 あみだくじ SVG 生成スクリプト（横棒連続禁止・全連結対応）
// =============================

const AMIDA_STYLE = {
  width: 500,
  height: 400,
  lineColor: "#000",
  lineWidth: 2,
  gap: 90,
  topMargin: 40,
  bottomMargin: 40,
  minLaddersPerPair: 1, // 各ペアに最低1本
};

/**
 * 🎨 あみだくじSVGを生成して文字列で返す
 * @param {string[]} players - プレイヤー名の配列
 * @param {string} money - 金額文字列（例："34506"）
 * @returns {string} SVG文字列
 */
function generateAmidaSVG(players, money = "34506") {
  const {
    height,
    lineColor,
    lineWidth,
    gap,
    topMargin,
    bottomMargin,
    minLaddersPerPair,
  } = AMIDA_STYLE;

  // ==== 初期設定 ====
  const digits = money.split("");
  const numGoals = digits.length;
  const numRows = Math.max(5, players.length * 2); // 縦方向の分割を可変
  const svgHeight = height;
  const svgWidth = gap * (numGoals - 1) + 200;

  // ==== 横棒生成 ====
  const ladders = Array.from({ length: numRows }, () => []);

  // 各ペアに最低1本確保（孤立防止）
  for (let i = 0; i < numGoals - 1; i++) {
    const row = Math.floor(Math.random() * numRows);
    ladders[row].push(i);
  }

  // ランダム追加（隣接禁止）
  for (let row = 0; row < numRows; row++) {
    let lastIndex = -2; // 直前の横棒位置
    for (let i = 0; i < numGoals - 1; i++) {
      if (i === lastIndex + 1) continue; // 隣接禁止
      if (Math.random() < 0.35 && !ladders[row].includes(i)) {
        ladders[row].push(i);
        lastIndex = i;
      }
    }
  }

  // ==== 孤立していないかチェックし、不足ペアに横棒追加 ====
  const connected = Array(numGoals - 1).fill(false);
  ladders.forEach((row) => {
    row.forEach((i) => (connected[i] = true));
  });

  connected.forEach((isConnected, i) => {
    if (!isConnected) {
      const randRow = Math.floor(Math.random() * numRows);
      if (
        !ladders[randRow].includes(i - 1) &&
        !ladders[randRow].includes(i + 1)
      ) {
        ladders[randRow].push(i);
      }
    }
  });

  // ==== 経路シミュレーション ====
  const finalPositions = Array.from({ length: numGoals }, (_, i) => i);
  ladders.forEach((row) => {
    row.sort((a, b) => a - b);
    row.forEach((i) => {
      const tmp = finalPositions[i];
      finalPositions[i] = finalPositions[i + 1];
      finalPositions[i + 1] = tmp;
    });
  });

  // ==== プレイヤー割り当て ====
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  const assignedPlayers =
    players.length < numGoals
      ? Array.from({ length: numGoals }, (_, i) => shuffled[i % shuffled.length])
      : shuffled.slice(0, numGoals);

  const overflowPlayers = players.slice(numGoals);
  const results = finalPositions.map((pos) => assignedPlayers[pos]);

  // ==== SVG構築 ====
  let svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg" style="background:#fff;">`;

  // 縦線
  for (let i = 0; i < numGoals; i++) {
    const x = 50 + i * gap;
    svg += `<line x1="${x}" y1="${topMargin}" x2="${x}" y2="${
      svgHeight - bottomMargin
    }" stroke="${lineColor}" stroke-width="${lineWidth}" />`;
  }

  // 横線
  for (let row = 0; row < numRows; row++) {
    const y =
      topMargin +
      ((svgHeight - topMargin - bottomMargin) / (numRows + 1)) * (row + 1);
    const used = [];
    ladders[row]
      .sort((a, b) => a - b)
      .forEach((i) => {
        if (used.includes(i - 1) || used.includes(i + 1)) return; // 連続禁止
        const x1 = 50 + i * gap;
        const x2 = x1 + gap;
        svg += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${lineColor}" stroke-width="${lineWidth}" />`;
        used.push(i);
      });
  }

  // スタート名
  assignedPlayers.forEach((n, i) => {
    const x = 50 + i * gap;
    svg += `<text x="${x}" y="20" font-size="14" text-anchor="middle" fill="#333">${n}</text>`;
  });

  // ゴール名
  results.forEach((n, i) => {
    const x = 50 + i * gap;
    svg += `<text x="${x}" y="${svgHeight - 10}" font-size="14" text-anchor="middle" fill="#333">${n}</text>`;
  });

  // 金額ラベル
  digits.forEach((d, i) => {
    const x = 50 + i * gap;
    svg += `<text x="${x}" y="${svgHeight - 25}" font-size="12" text-anchor="middle" fill="#555">${d}</text>`;
  });

  // 当たりゾーン（あふれた場合）
  if (overflowPlayers.length > 0) {
    const x = 50 + numGoals * gap + 40;
    svg += `<line x1="${x - 20}" y1="${topMargin}" x2="${x - 20}" y2="${
      svgHeight - bottomMargin
    }" stroke="transparent" stroke-width="1" />`;
    svg += `<text x="${x}" y="${svgHeight / 2 - 20}" font-size="16" fill="red">当たり！</text>`;
    overflowPlayers.forEach((name, i) => {
      svg += `<text x="${x}" y="${
        svgHeight / 2 + i * 20
      }" font-size="14" fill="#333">${name}</text>`;
    });
  }

  svg += `</svg>`;
  return svg;
}

export { generateAmidaSVG };

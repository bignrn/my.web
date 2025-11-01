// =============================
// 💴 あみだくじ SVG 生成スクリプト（デバッグ修正版）
//   - 描画と経路計算で同じ横棒データを使う
//   - 隣接禁止を入れる（横棒が連続しない）
//   - 各ペア（i と i+1 の間）に最低1本を保証（必要なら行を増やす）
//   - 経路シミュレーションは「各列を上から下へたどる」方式
// =============================

const AMIDA_STYLE = {
  width: 500,
  height: 420,
  lineColor: "#000",
  lineWidth: 2,
  gap: 90,
  topMargin: 40,
  bottomMargin: 70, // テキストと縦線の干渉を避けるために余裕を持たせる
  minRows: 5, // 最低行数
  font: {
    playerSize: 14,
    resultSize: 14,
    moneySize: 20,
    hitSize: 16,
  },
};

/**
 * 🎨 あみだくじSVGを生成して文字列で返す（修正版）
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
    minRows,
    font,
  } = AMIDA_STYLE;

  // ---- 初期設定 ----
  const digits = String(money).split("");
  const numGoals = digits.length; // ゴール（縦線）数
  let numRows = Math.max(minRows, players.length * 2); // 行数を人数に応じて増やす
  const svgHeight = height;

  // あふれ表示の有無で幅を調整
  const hasOverflow = players.length > numGoals;
  const extraSpace = hasOverflow ? 200 : 0;
  const svgWidth = gap * (numGoals - 1) + extraSpace + 100;

  // ---- 横棒（ladders）を確定するロジック ----
  // ladders[row] = [i, j, ...] : その行で i と i+1 が繋がる横棒がある（i は左側の列番号）
  let ladders = Array.from({ length: numRows }, () => []);

  // ヘルパー: その行に i を追加できるか（隣接禁止を満たすか）
  const canPlace = (rowArr, pos) => {
    return !rowArr.includes(pos - 1) && !rowArr.includes(pos + 1) && !rowArr.includes(pos);
  };

  // 1) 各ペアに最低1本置く（孤立防止）
  for (let pair = 0; pair < numGoals - 1; pair++) {
    // ランダム試行で行を探す。見つからなければ行数を増やして配置する
    let placed = false;
    const attempts = shuffleArray([...Array(numRows).keys()]); // 行の順序をランダム化
    for (const r of attempts) {
      if (canPlace(ladders[r], pair)) {
        ladders[r].push(pair);
        placed = true;
        break;
      }
    }
    if (!placed) {
      // 既存行に置けない場合は新しい行を作ってそこに置く（隣接の心配なし）
      ladders.push([pair]);
      numRows++;
    }
  }

  // 2) ランダムに追加してバリエーションを付ける（隣接禁止を厳守）
  for (let r = 0; r < numRows; r++) {
    // 各行で左右から1つずつのような偏りを避けるため、ペア位置をシャッフルして試す
    const positions = shuffleArray([...Array(numGoals - 1).keys()]);
    positions.forEach((pos) => {
      // 追加確率（調整可）
      if (Math.random() < 0.30) {
        if (canPlace(ladders[r], pos)) {
          ladders[r].push(pos);
        }
      }
    });
  }

  // 各行の配列はソートしておく（描画・シミュレーションの安定化）
  ladders.forEach((row) => row.sort((a, b) => a - b));

  // ---- 経路シミュレーション（**表示と同じ ladders を使う**） ----
  // 各スタート列 start (0..numGoals-1) について上から下へたどる
  const finalPositions = new Array(numGoals).fill(0);
  for (let start = 0; start < numGoals; start++) {
    let pos = start;
    for (let r = 0; r < numRows; r++) {
      const row = ladders[r];
      // もし左から右へ繋がっている横棒が現在のposにあれば右へ移動
      if (row.includes(pos)) {
        pos = pos + 1;
        continue;
      }
      // もし左隣（pos-1）に横棒があれば左へ移動
      if (pos - 1 >= 0 && row.includes(pos - 1)) {
        pos = pos - 1;
        continue;
      }
      // それ以外はそのまま下へ
    }
    finalPositions[start] = pos;
  }

  // ---- プレイヤー割り当て（start列に対して） ----
  // startPlayers: 上部に並べる名前（numGoals 個）。players が少なければ繰り返す、多ければ先頭を使う
  const shuffledPlayers = shuffleArray([...players]);
  let startPlayers = [];
  while (startPlayers.length < numGoals) {
    startPlayers = startPlayers.concat(shuffledPlayers);
  }
  startPlayers = startPlayers.slice(0, numGoals);

  // final mapping: start index -> goal index = finalPositions[start]
  // goalPlayers[pos] = player who started at start where finalPositions[start] == pos
  const goalPlayers = Array(numGoals).fill("");
  for (let s = 0; s < numGoals; s++) {
    const g = finalPositions[s];
    goalPlayers[g] = startPlayers[s];
  }

  // overflow players: players that didn't appear in startPlayers (右の当たりゾーンに表示)
  const overflowPlayers = players.slice(numGoals);

  // ---- SVG構築（描画に使う ladders をそのまま利用） ----
  let svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg" style="background:#fff;">`;

  // 縦線（描画）
  for (let i = 0; i < numGoals; i++) {
    const x = 50 + i * gap;
    svg += `<line x1="${x}" y1="${topMargin}" x2="${x}" y2="${svgHeight - bottomMargin}" stroke="${lineColor}" stroke-width="${lineWidth}" />`;
  }

  // 横線（描画） — ladders をそのまま描く（隣接禁止を守っている）
  for (let r = 0; r < numRows; r++) {
    const y = topMargin + ((svgHeight - topMargin - bottomMargin) / (numRows + 1)) * (r + 1);
    ladders[r].forEach((i) => {
      const x1 = 50 + i * gap;
      const x2 = x1 + gap;
      svg += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${lineColor}" stroke-width="${lineWidth}" />`;
    });
  }

  // 上部スタート名（startPlayers）
  for (let i = 0; i < numGoals; i++) {
    const x = 50 + i * gap;
    svg += `<text x="${x}" y="20" font-size="${font.playerSize}" text-anchor="middle" fill="#333">${escapeXml(
      startPlayers[i]
    )}</text>`;
  }

  // 下部: 名前（結果）を上、金額を下に配置（見た目調整）
  for (let i = 0; i < numGoals; i++) {
    const x = 50 + i * gap;
    const nameY = svgHeight - 35;
    const moneyY = svgHeight - 12;
    svg += `<text x="${x}" y="${nameY}" font-size="${font.resultSize}" text-anchor="middle" fill="#333">${escapeXml(
      goalPlayers[i]
    )}</text>`;
    svg += `<text x="${x}" y="${moneyY}" font-size="${font.moneySize}" text-anchor="middle" fill="#555">${escapeXml(
      digits[i]
    )}</text>`;
  }

  // 当たりゾーン（あふれた場合は表示） — ゴールのすぐ右に表示
  if (overflowPlayers.length > 0) {
    const x = 50 + numGoals * gap + 40;
    svg += `<text x="${x}" y="${svgHeight / 2 - 20}" font-size="${font.hitSize}" fill="red">当たり！</text>`;
    overflowPlayers.forEach((name, idx) => {
      svg += `<text x="${x}" y="${svgHeight / 2 + idx * 20}" font-size="${font.playerSize}" fill="#333">${escapeXml(
        name
      )}</text>`;
    });
  }

  svg += `</svg>`;
  return svg;
}

/* ---------- ヘルパー関数 ---------- */

// 配列をシャッフルして返す（Fisher–Yates）
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 単純な XML エスケープ（表示用の安全処理）
function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export { generateAmidaSVG };

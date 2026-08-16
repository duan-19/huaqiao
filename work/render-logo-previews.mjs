import sharp from 'file:///C:/Users/29969/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/lib/index.js'

const jobs = [
  ['outputs/logo/logo-symbol-youth-v1.svg', 'outputs/logo/logo-symbol-youth-v1.png', 1600],
  ['outputs/logo/logo-horizontal-youth-v1.svg', 'outputs/logo/logo-horizontal-youth-v1.png', 1800],
  ['outputs/logo/logo-concept-sheet-youth-v1.svg', 'outputs/logo/logo-concept-sheet-youth-v1.png', 1800],
]

for (const [input, output, width] of jobs) {
  await sharp(input, { density: 180 }).resize({ width }).png().toFile(output)
}

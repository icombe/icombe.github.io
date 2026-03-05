import { access, mkdir, readdir, rm, stat, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const sourceDir = process.env.LOAN_ANALYZER_DIST
  ? path.resolve(repoRoot, process.env.LOAN_ANALYZER_DIST)
  : path.resolve(repoRoot, '..', 'loan-tracker', 'dist');

const targetDir = path.resolve(repoRoot, 'public', 'loan-analyzer');

async function exists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function copyDirectoryRecursive(fromDir, toDir) {
  await mkdir(toDir, { recursive: true });
  const entries = await readdir(fromDir, { withFileTypes: true });

  for (const entry of entries) {
    const fromPath = path.join(fromDir, entry.name);
    const toPath = path.join(toDir, entry.name);

    if (entry.isDirectory()) {
      await copyDirectoryRecursive(fromPath, toPath);
    } else if (entry.isFile()) {
      await copyFile(fromPath, toPath);
    }
  }
}

async function main() {
  const sourceExists = await exists(sourceDir);

  if (!sourceExists) {
    const fallbackIndex = path.join(targetDir, 'index.html');
    const hasFallback = await exists(fallbackIndex);

    if (hasFallback) {
      console.warn(`[sync:loan-analyzer] Source not found at ${sourceDir}. Keeping existing ${targetDir}.`);
      return;
    }

    throw new Error(
      `[sync:loan-analyzer] No source build found at ${sourceDir} and no existing public/loan-analyzer fallback.`
    );
  }

  const sourceStats = await stat(sourceDir);
  if (!sourceStats.isDirectory()) {
    throw new Error(`[sync:loan-analyzer] Source path is not a directory: ${sourceDir}`);
  }

  await rm(targetDir, { recursive: true, force: true });
  await mkdir(targetDir, { recursive: true });
  await copyDirectoryRecursive(sourceDir, targetDir);

  const copiedIndex = path.join(targetDir, 'index.html');
  if (!(await exists(copiedIndex))) {
    throw new Error('[sync:loan-analyzer] Copy completed but index.html is missing in public/loan-analyzer.');
  }

  console.log(`[sync:loan-analyzer] Synced ${sourceDir} -> ${targetDir}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});

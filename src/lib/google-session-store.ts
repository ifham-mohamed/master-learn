import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

export function seal(value: unknown, key: Buffer) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const data = Buffer.concat([
    cipher.update(JSON.stringify(value), "utf8"),
    cipher.final(),
  ]);
  return Buffer.concat([iv, cipher.getAuthTag(), data]).toString("base64url");
}
export function unseal<T>(value: string, key: Buffer): T {
  const data = Buffer.from(value, "base64url");
  const decipher = createDecipheriv("aes-256-gcm", key, data.subarray(0, 12));
  decipher.setAuthTag(data.subarray(12, 28));
  return JSON.parse(
    Buffer.concat([
      decipher.update(data.subarray(28)),
      decipher.final(),
    ]).toString("utf8"),
  );
}
export class SessionStore {
  constructor(
    private root: string,
    private key: Buffer,
  ) {}
  private file(id: string) {
    if (!/^[a-f0-9]{64}$/.test(id))
      throw new Error("Invalid session identifier");
    return path.join(this.root, `${id}.session`);
  }
  async read<T extends { expires: number }>(id: string): Promise<T | null> {
    try {
      const record = unseal<T>(await readFile(this.file(id), "utf8"), this.key);
      if (record.expires <= Date.now()) {
        await this.remove(id);
        return null;
      }
      return record;
    } catch {
      return null;
    }
  }
  async write(id: string, record: unknown) {
    const target = this.file(id);
    await mkdir(this.root, { recursive: true, mode: 0o700 });
    const temporary = `${target}.${randomBytes(8).toString("hex")}.tmp`;
    await writeFile(temporary, seal(record, this.key), {
      mode: 0o600,
      flag: "wx",
    });
    await rename(temporary, target);
  }
  async remove(id: string) {
    await unlink(this.file(id)).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") throw error;
    });
  }
}

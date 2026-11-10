import {DatabaseSync} from 'node:sqlite';
import {mkdirSync, chmodSync} from 'node:fs';
import path from 'node:path';
import {createHash, randomBytes, randomUUID} from 'node:crypto';
export const hash = value => createHash('sha256').update(value).digest('hex');
export const secret = () => randomBytes(32).toString('base64url');
export function openStore(directory) {
  mkdirSync(directory, {recursive:true, mode:0o700});
  chmodSync(directory, 0o700);
  const filename=path.join(directory,'members.sqlite');
  const db=new DatabaseSync(filename);
  chmodSync(filename,0o600);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS members (
      id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, interests TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL CHECK(status IN ('unverified','pending','approved','rejected','suspended')),
      verified_at INTEGER, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (email TEXT PRIMARY KEY, created_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS tokens (hash TEXT PRIMARY KEY, member_id TEXT NOT NULL REFERENCES members(id), expires_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions (hash TEXT PRIMARY KEY, member_id TEXT NOT NULL REFERENCES members(id), expires_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS mail (id TEXT PRIMARY KEY, recipient TEXT NOT NULL, subject TEXT NOT NULL, text TEXT NOT NULL,
      link TEXT, status TEXT NOT NULL DEFAULT 'queued', attempts INTEGER NOT NULL DEFAULT 0, next_attempt INTEGER NOT NULL,
      created_at INTEGER NOT NULL, expires_at INTEGER, error TEXT);
    CREATE TABLE IF NOT EXISTS materials (id TEXT PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL,
      filename TEXT NOT NULL, bytes INTEGER NOT NULL, active INTEGER NOT NULL DEFAULT 1, created_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS audit (id TEXT PRIMARY KEY, actor TEXT NOT NULL, member_id TEXT NOT NULL, action TEXT NOT NULL, created_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, until INTEGER NOT NULL);
  `);
  return {
    db, directory,
    transaction(fn) { db.exec('BEGIN IMMEDIATE'); try {const value=fn(); db.exec('COMMIT');return value;} catch(e){db.exec('ROLLBACK');throw e;} },
    token(memberID, origin) {
      const token=secret(), now=Date.now();
      db.prepare('DELETE FROM tokens WHERE member_id=? OR expires_at<?').run(memberID,now);
      db.prepare('INSERT INTO tokens VALUES (?,?,?)').run(hash(token),memberID,now+20*60_000);
      return `${origin}/associados/confirmar#token=${token}`;
    },
    mail(recipient, subject, text, link=null) {
      const now=Date.now();
      db.prepare('INSERT INTO mail (id,recipient,subject,text,link,next_attempt,created_at,expires_at) VALUES (?,?,?,?,?,?,?,?)')
        .run(randomUUID(),recipient,subject,text,link,now,now,link?now+20*60_000:null);
    },
    limited(key, maximum, window=3600_000) {
      const now=Date.now();
      db.prepare('DELETE FROM rate_limits WHERE until<?').run(now);
      db.prepare('INSERT INTO rate_limits VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1').run(hash(key),now+window);
      return db.prepare('SELECT count FROM rate_limits WHERE key=?').get(hash(key)).count>maximum;
    }
  };
}

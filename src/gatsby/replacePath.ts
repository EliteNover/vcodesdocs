export default function replacePath(path: string) {
  return path === '/' ? path : path.replace(/\/$/, '')
}
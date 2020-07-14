export function writeFile(emscriptenFs: any, path: string, content: string) {
    const dir = path.substring(0, path.lastIndexOf("/"))
    if (!emscriptenFs.findObject(dir)) {
        emscriptenFs.mkdirTree(dir)
    }
    emscriptenFs.writeFile(path, content)
}

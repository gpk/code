const assert = require('assert')
const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
assert.equal(args.length, 1)
const baseDir = args[0]

assert.ok(fs.lstatSync(baseDir).isDirectory())

const filesToUpload = []

function recursivelyFindFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file)
    const lstat = fs.lstatSync(fullPath)
    assert.ok(lstat.size < 5_000_000, "sanity-check file size")

    if (lstat.isDirectory()) {
      recursivelyFindFiles(fullPath)
    } else {
      filesToUpload.push(fullPath)
    }
  })
}

recursivelyFindFiles(baseDir)

console.log("files to upload: ", filesToUpload)
assert.ok(filesToUpload.length < 20, "sanity-check file count")


const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket('dev.gpkpw.com');

filesToUpload.forEach((localFilePath) => {
  const destPath = localFilePath.substring(baseDir.length + 1)
  bucket.upload(localFilePath, {destination: destPath})
  console.log(`uploaded '${localFilePath}' to '${destPath}'`)
})

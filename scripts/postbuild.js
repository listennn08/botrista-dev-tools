// upload `dist` to `gist`, use octokit to upload

import { join } from 'path'
import dotenv from 'dotenv'
import { Octokit } from 'octokit'
import { readdir, readFile, writeFile } from 'fs/promises';

dotenv.config()

;(async () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  })

  const distPath = join(process.cwd(), 'dist');
  // read all files in distPath
  const currentFiles = await readdir(distPath)
  let gist_id = process.env.GIST_ID
  let isNewGist = false
  let gistFiles = []
  try {
    gistFiles = Object.keys((await octokit.rest.gists.get({
      gist_id: process.env.GIST_ID,
    })).data.files)
  } catch (error) {
    isNewGist = true
  }

  const files = {}
  // upload all files in distPath to gist
  for (const file of currentFiles) {
    const content = await readFile(join(distPath, file), 'utf8')
    files[file] = { content }
  }

  try {
    if (isNewGist) {
      gist_id = (await octokit.rest.gists.create({ files, public: true })).data.id
      console.log(`Created new gist ${gist_id}`)
      // replace gist_id in .env
      const env = await readFile(join(process.cwd(), '.env'), 'utf8')
      const newEnv = env.replace(/GIST_ID=.*/, `GIST_ID=${gist_id}`)
      await writeFile(join(process.cwd(), '.env'), newEnv)
      isNewGist = false
    } else {
      await octokit.rest.gists.update({ gist_id, files })
      console.log(`Updated gist ${gist_id}`)
    }
  } catch (error) {
    console.error(error)
  }
})()

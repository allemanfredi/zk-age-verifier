import { exec as _exec } from 'child_process'
import { promisify } from 'util'

module.exports.asyncExec = async (_command) => {
  const { stderr, stdout } = await promisify(exec)(_command)
  if (stderr) {
    throw new Error(stderr)
  }
  console.info(stdout)
}
